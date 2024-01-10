const { PDFDocument, rgb } = window.PDFLib;

let pdfBytes;
const editableContents = [];

async function loadAndDisplayPdf() {
//   const pdfUrl = 'software-development-proposal-template-1702352345704.pdf';
    const pdfUrl = 'Nigerian Air Force 2.pdf';

  // Asynchronously download PDF as an ArrayBuffer
  pdfBytes = await fetch(pdfUrl).then(response => response.arrayBuffer());

  // Load PDF using pdf.js
  const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
  const pdf = await loadingTask.promise;

  // Render the first page
  const pageNumber = 1;
  const page = await pdf.getPage(pageNumber);

  // Get viewport
  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  // Prepare canvas
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // Render PDF to canvas
  await page.render({ canvasContext: context, viewport }).promise;

  // Display the canvas
  const pdfContainer = document.getElementById('pdf-container');
  pdfContainer.innerHTML = '';
  pdfContainer.appendChild(canvas);

  // Add double-click event to canvas for adding editable content
  canvas.addEventListener('dblclick', addEditableContent);
}

function addEditableContent(event) {
    // Check if the double-click is on the canvas
    if (event.target.tagName.toLowerCase() === 'canvas') {
      // Get coordinates of double-click
      const x = event.clientX + window.scrollX;
      const y = event.clientY + window.scrollY;
  
      let customFontSize = 14;
  
      // Create an editable div
      const editableContent = document.createElement('div');
      editableContent.contentEditable = true;
      editableContent.style.position = 'absolute'; // Keep it as 'absolute'
      editableContent.style.left = `${x}px`;
      editableContent.style.top = `${y}px`;
      editableContent.style.fontSize = `${customFontSize}px`;
      editableContent.innerText = 'Editable Text';
  
      // Append the editable content to the container (same container as the canvas)
      const canvasContainer = document.getElementById('pdf-container');
      canvasContainer.appendChild(editableContent);
  
      // Save the editable content and its position
      editableContents.push({ element: editableContent, x, y });
  
      // Make the editable content draggable
      makeDraggable(editableContent);
  
      // Focus on the editable content
      editableContent.focus();
    }
  }
  
  function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;
  
    // Handle mousedown to start dragging
    element.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      offsetX = e.clientX - parseFloat(element.style.left);
      offsetY = e.clientY - parseFloat(element.style.top);
    });
  
    // Handle mousemove to drag the element
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
  
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
  
        // Update the editable content position in the array
        const index = editableContents.findIndex((item) => item.element === element);
        if (index !== -1) {
          editableContents[index].x = newX;
          editableContents[index].y = newY;
        }
      }
    });
  
    // Handle mouseup to stop dragging
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }


// Function to convert pixels to points
function pixelsToPoints(pixels, dpi = 96) {
  const inchesX = pixels.x / dpi;
  const inchesY = pixels.y / dpi;
  const pointsX = inchesX * (72 / 1.1); // 1 inch = 72 points
  const pointsY = inchesY * (72 / 1.1); // 1 inch = 72 points
  return { x: pointsX, y: pointsY };
}


const selectFontSizeElement = document.getElementById('font-size-selector');
selectFontSizeElement.addEventListener('change', () => {
    setFontSize();
});

// Function for setting font size
function setFontSize(){
   const selectedOption = selectFontSizeElement.options[selectFontSizeElement.selectedIndex];
   const selectedFontSizeValue = selectedOption.value;
   console.log(selectedFontSizeValue);
   return Number(selectedFontSizeValue);
}

//  Function to conver hexa color to rgb
function hexToRgb(hex) {
    // Remove the hash if present
    hex = hex.replace(/^#/, '');
  
    // Parse the hex value
    const bigint = parseInt(hex, 16);
  
    // Extract the RGB components
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    // modify from 0-255 to 0-1
    const red = Number((r/255).toFixed(1));
    const green = Number((g/255).toFixed(1));
    const blue = Number((b/255).toFixed(1));
  
    // Return the RGB values as an object
    return { red, green, blue };
  }


const selectTextFontColor = document.getElementById('color-picker');
selectTextFontColor.addEventListener('change', () => {
    setTextColor();
})

// Function for setting font color
function setTextColor(){
    const textColor = selectTextFontColor.value;
    const rgbColor = hexToRgb(textColor);
    // console.log(rgbColor);
    return rgbColor;
}


async function modifyAndDownloadPdf() {
  if (!pdfBytes) {
    console.error('PDF not loaded');
    return;
  }

  // Use pdf-lib to modify the PDF
  const pdfDoc = await PDFDocument.load(pdfBytes);

  editableContents.forEach(({ element, x, y }) => {
    const editText = element.innerText;
    const firstPage = pdfDoc.getPages()[0];

    // Dynamically set the position based on the editableContent position in points
    const { x: pointsX, y: pointsY } = pixelsToPoints({ x, y });

    // Get dynamic color
    const fontColor = setTextColor();

    // Get fontSize base on user's choice
    const fontSize =  setFontSize();

    firstPage.drawText(`${editText}`, {
      x: pointsX, // x: pointsX - 85.1,
      y: firstPage.getSize().height - pointsY, // Invert Y-axis for correct positioning
      size: fontSize,
      color: rgb(fontColor.red, fontColor.green, fontColor.blue),
    });
  });

  // Save the modified PDF
  const modifiedPdfBytes = await pdfDoc.save();

  // Provide download link for the modified PDF
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' }));
  downloadLink.download = 'modified-pdf.pdf';
  downloadLink.click();
}

const downloadBtn = document.getElementById('modifyAndDownloadPdf');
const loadPDFBtn = document.getElementById('loadAndDisplayPdf');

downloadBtn.addEventListener('click', () => {
  modifyAndDownloadPdf();
});

// loadPDFBtn.addEventListener('click', () => {
  loadAndDisplayPdf();
// });
