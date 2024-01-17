const { PDFDocument, rgb } = window.PDFLib;

let pdfBytes;
const editableContents = [];

// Get the current URL path
async function getDocumentId(){
    const currentPath = window.location.pathname;

    // Split the path into segments
    const pathSegments = currentPath.split('/');

    // Access the parameter based on its position in the path
    const documentId = pathSegments[2]; // Index 2 corresponds to the position of the parameter
    return documentId;
}
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOjI5LCJlbWFpbCI6ImNvZGVzaG9lbEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ3NDY1ODgsImV4cCI6MTcwNzMzODU4OH0.BwROzzww3osSf-YsCRAbVyQZtT40NfIxsxAOZFkijXs';

async function getDocument(){

    const documentId = await getDocumentId();

    axios({
        method: 'GET',
        url: `http://localhost:8000/v1/api/tenant/document/${documentId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        loadAndDisplayPdf(response.data);
    }).catch((error) => {
        console.error(error.message);
    });
}

getDocument();


async function loadPagePreviewer(pdfData){
    const pdfPreviewerContainer = document.createElement('div');

    const { _pdfInfo } = pdfData;

    for(let pageNum = 1; pageNum <= _pdfInfo.numPages; pageNum++){
        const page = await pdfData.getPage(pageNum);
        
        console.log(page);

        // Get viewport
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // Prepare canvas
        const canvas = document.createElement('canvas');
        canvas.style.width = '125px';
        canvas.style.height = '200px';
        canvas.style.padding = '5px';
        canvas.style.margin = '5px';
        canvas.style.boxShadow = '0px 0px 8px 0px #ccc';
        // canvas.style.border = '1px solid #f2f2';
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF to canvas
        await page.render({ canvasContext: context, viewport }).promise;

        pdfPreviewerContainer.appendChild(canvas);
    }

    const previewerParentDiv = document.getElementById('previewer-parent-div');
    previewerParentDiv.appendChild(pdfPreviewerContainer);
}





async function loadAndDisplayPdf(pdfDocumentData) {
    
    const pdfUrl = pdfDocumentData.path;
    // Asynchronously download PDF as an ArrayBuffer
    pdfBytes = await fetch(pdfUrl).then(response => response.arrayBuffer());

    // Load PDF using pdf.js
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdf = await loadingTask.promise;

    // Transport pdf document to previewer
    await loadPagePreviewer(pdf);

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

let fontColor = '#41414'; // Default font color
const selectTextFontColor = document.getElementById('color-picker');
selectTextFontColor.addEventListener('input', () => {
    fontColor = selectTextFontColor.value;
});

let fontSize = 12;
const selectFontSizeElement = document.getElementById('font-size-selector');
selectFontSizeElement.addEventListener('change', () => {
    fontSize = setFontSize();
});

// Function for setting font size
function setFontSize(){
   const selectedOption = selectFontSizeElement.options[selectFontSizeElement.selectedIndex];
   const selectedFontSizeValue = selectedOption.value;
   return Number(selectedFontSizeValue);
}


let selectedEditableContent = null;

// Function to set the selected editable content
function setSelectedEditableContent(editableObj) {
    selectedEditableContent = editableObj;
}

// Function to handle font size changes for the selected editable content
function handleFontSizeChange(fontSize) {
    if (selectedEditableContent) {
        selectedEditableContent.fontSize = fontSize;
        selectedEditableContent.element.style.fontSize = `${fontSize}px`;
    }
}

// Function to handle color changes for the selected editable content
function handleColorChange(color) {
    if (selectedEditableContent) {
        selectedEditableContent.color = color;
        selectedEditableContent.element.style.color = color;
    }
}

async function addEditableContent(event) {
    if (event.target.tagName.toLowerCase() === 'canvas') {
        const x = event.clientX + window.scrollX;
        const y = event.clientY + window.scrollY;

        const editableContent = document.createElement('div');
        editableContent.contentEditable = true;
        editableContent.style.position = 'absolute';
        editableContent.style.left = `${x}px`;
        editableContent.style.top = `${y}px`;
        editableContent.style.fontSize = `${fontSize}px`;
        editableContent.innerText = 'Editable Text';

        const canvasContainer = document.getElementById('pdf-container');
        canvasContainer.appendChild(editableContent);

        const documentAccessToken = await getDocumentId();

        const editableObj = { 
            id: generateUniqueId(), 
            text: editableContent.innerText, 
            x, 
            y, 
            color: fontColor,
            access_token: documentAccessToken,
            fontSize: fontSize,
            element: editableContent  // Keep a reference to the DOM element
        };
        editableContents.push(editableObj);

        makeDragResizable(editableContent, editableObj);

        editableContent.addEventListener('input', () => {
            editableObj.text = editableContent.innerText;
        });

        canvasContainer.addEventListener('click', () => {
            editableContent.style.outline = 'none';
            editableContent.style.border = 'none';
        });

        editableContent.addEventListener('dblclick', () => {
            editableContent.style.outline = 'none';
            editableContent.style.border = '3px solid deepskyblue';
            setSelectedEditableContent(editableObj);
            editableContent.focus();
        });

        selectTextFontColor.addEventListener('input', () => {
            const newColor = selectTextFontColor.value;
            handleColorChange(newColor);
        });

        selectFontSizeElement.addEventListener('change', () => {
            const newSize = setFontSize();
            handleFontSizeChange(newSize);
        });
    }
}



function makeDragResizable(element, editableObj) {
    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY;
    let originalWidth, originalHeight;

    const resizers = createResizers(element);

    resizers.forEach((resizer, index) => {
        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
            offsetX = e.clientX;
            offsetY = e.clientY;
            originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        });
    });

    element.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        offsetX = e.clientX - parseFloat(element.style.left);
        offsetY = e.clientY - parseFloat(element.style.top);
    });

    document.addEventListener('mousemove', handleDragResize);
    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false;
    });

    function handleDragResize(e) {
        if (isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;

            updateEditableContentPositionSize(element, editableObj, newX, newY);
        }

        if (isResizing) {
            const width = originalWidth + e.clientX - offsetX;
            const height = originalHeight + e.clientY - offsetY;

            element.style.width = `${width}px`;
            element.style.height = `${height}px`;

            updateEditableContentPositionSize(element, editableObj, element.style.left, element.style.top, width, height);

            const newFontSize = calculateFontSize(width);
            element.style.fontSize = `${newFontSize}px`;

            updateEditableContentFontSize(editableObj, newFontSize);
        }
    }
}

// Helper function to create resizable handlers
function createResizers(element) {
    const resizers = [];
    const directions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    directions.forEach((direction) => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer', direction);
        element.appendChild(resizer);
        resizers.push(resizer);
    });

    return resizers;
}

// Helper function to update editable content position and size in real-time
function updateEditableContentPositionSize(element, editableObj, x, y, width, height) {
    if (editableObj) {
        editableObj.x = parseFloat(x);
        editableObj.y = parseFloat(y);
        editableObj.width = parseFloat(width);
        editableObj.height = parseFloat(height);
    }
}

// Helper function to update editable content font size in real-time
function updateEditableContentFontSize(editableObj, fontSize) {
    if (editableObj) {
        editableObj.fontSize = parseFloat(fontSize);
    }
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}



// Function to convert pixels to points
function pixelsToPoints(pixels, dpi = 96) {
  const inchesX = pixels.x / dpi;
  const inchesY = pixels.y / dpi;
  const pointsX = inchesX * (72 / 1.1); // 1 inch = 72 points
  const pointsY = inchesY * (72 / 1.1); // 1 inch = 72 points
  return { x: pointsX, y: pointsY };
}

async function modifyAndDownloadPdf() {
  if (!pdfBytes) {
    console.error('PDF not loaded');
    return;
  }

    axios({
        method: 'patch',
        url: `http://localhost:8000/v1/api/tenant/document`,
        data: editableContents,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        loadAndDisplayPdf(response.data);
    }).catch((error) => {
        console.error(error.message);
    });
  
}

const saveChanges = document.getElementById('modifyAndDownloadPdf');
saveChanges.addEventListener('click', () => {
  modifyAndDownloadPdf();
});

