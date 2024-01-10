const { PDFDocument, rgb } = window.PDFLib;

let pdfBytes;

async function loadAndDisplayPdf() {
  const pdfUrl = 'software-development-proposal-template-1702352345704.pdf';

  // Asynchronously download PDF as an ArrayBuffer
  pdfBytes = await fetch(pdfUrl).then(response => response.arrayBuffer());

  // Load PDF using pdf.js
  const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
  const pdf = await loadingTask.promise;

  // Render the first page
  const pageNumber = 1;
  const page = await pdf.getPage(pageNumber);

  // Get text content items
//   const textContent = await page.getTextContent();
//   const textItems = textContent.items;

//   // Extract font size from the first text item
//   const fontSize = textItems[0].fontSize;

//   console.log(page.commonObjs);

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
      const x = event.clientX;
      const y = event.clientY;
  
      // Create an editable div
      const editableContent = document.createElement('div');
      editableContent.contentEditable = true;
      editableContent.style.position = 'absolute';  // Keep it as 'absolute'
      editableContent.style.left = `${x}px`;
      editableContent.style.top = `${y}px`;
      editableContent.innerText = 'Editable Text';
  
      // Append the editable content to the container (same container as the canvas)
      const canvasContainer = document.getElementById('pdf-container');
      canvasContainer.appendChild(editableContent);
  
      // Focus on the editable content
      editableContent.focus();
    }
}
  
  

// Function to convert pixels to points
function pixelsToPoints(pixels, dpi = 96) {
    const inchesPerMM = 0.0393701; // 1 inch = 25.4 mm
    const mmPerInch = 25.4;
    
    const inchesX = pixels.x / dpi;
    const inchesY = pixels.y / dpi;
    
    const pointsX = inchesX * 72; // 1 inch = 72 points
    const pointsY = inchesY * 72; // 1 inch = 72 points
  
    return { x: pointsX, y: pointsY };
}


// async function getFontSizeFromPdf() {
//     if (!pdfBytes) {
//       console.error('PDF not loaded');
//       return;
//     }
  
//     // Load PDF using pdf.js
//     const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
//     const pdf = await loadingTask.promise;
  
//     // Render the first page
//     const pageNumber = 1;
//     const page = await pdf.getPage(pageNumber);
  
    
//   }
  
//   // Call the function to get the font size
//   getFontSizeFromPdf();
  
  

async function modifyAndDownloadPdf() {
    if (!pdfBytes) {
      console.error('PDF not loaded');
      return;
    }
  
    // Get the text from the editable div
    const editableContent = document.querySelector('[contenteditable=true]');
    const editText = editableContent ? editableContent.innerText : '';
  
    // Get the position of the editable div relative to the canvas
    const editableContentRect = editableContent.getBoundingClientRect();
    const canvasRect = document.querySelector('canvas').getBoundingClientRect();
    const pixels = {
      x: editableContentRect.left - canvasRect.left,
      y: editableContentRect.top - canvasRect.top,
    };
  
    // Convert pixels to points
    const dpi = 96; // Adjust DPI based on your requirements
    const points = pixelsToPoints(pixels, dpi);
  
    // Use pdf-lib to modify the PDF
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const firstPage = pdfDoc.getPages()[0];
  
    // Dynamically set the position based on the editableContent position in points
    const { x, y } = points;
    firstPage.drawText(`${editText}`, { 
      x,
      y: firstPage.getSize().height - y, // Invert Y-axis for correct positioning
      size: 6,
      color: rgb(0.95, 0.1, 0.1),
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
    getFontSizeFromPdf();
});

loadPDFBtn.addEventListener('click', () => {
    loadAndDisplayPdf();
});
