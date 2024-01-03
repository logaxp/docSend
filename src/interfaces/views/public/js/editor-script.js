const { jsPDF } = window.jspdf;

const parentContainer = document.createElement('div');
parentContainer.classList.add('parent-container');

const pdfMirrior = document.createElement('div');
pdfMirrior.classList.add('pdf-mirror');
pdfMirrior.style.height='600px';
pdfMirrior.style.backgroundColor='#ffffff';
pdfMirrior.innerHTML='<h3>World Developer...!</h3>'

const pdfCanvasContainer = document.createElement('div');
pdfCanvasContainer.classList.add('pdf-canvas-container');

const documentCanvas = document.getElementById('PDFcanvas');
// documentCanvas.classList.add('pdfCanvas');
// documentCanvas.id = 'pdfCanvas';

pdfCanvasContainer.addEventListener('dblclick', (event) =>{
    const left = event.clientX;
    const top = event.clientY;
    addText(left, top);
})


const editToolContainer = document.createElement('div');
editToolContainer.classList.add('edit-tool-container');

const pdfInputField = document.createElement('input');
pdfInputField.type = 'file';
pdfInputField.id = 'fileInput';

const addTextAnnotationButton = document.createElement('button');
addTextAnnotationButton.id = 'addText';
addTextAnnotationButton.innerText = 'Add Text';

const convertCanvasToPDFButton = document.createElement('button');
convertCanvasToPDFButton.id = 'convertCanvasToPDF';
convertCanvasToPDFButton.innerText = 'Download';

parentContainer.appendChild(pdfMirrior);
pdfCanvasContainer.appendChild(documentCanvas);
parentContainer.appendChild(pdfCanvasContainer);
parentContainer.appendChild(editToolContainer);

editToolContainer.appendChild(pdfInputField);
editToolContainer.appendChild(addTextAnnotationButton);
editToolContainer.appendChild(convertCanvasToPDFButton);

document.body.appendChild(parentContainer);

const downloadPDFDocumentButton = document.getElementById('convertCanvasToPDF');
const addTextButton = document.getElementById('addText');

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
const scale = 1;
const outputScale = window.devicePixelRatio || 1;

const canvas = documentCanvas;
const context = canvas.getContext('2d');

const textFields = []; // Array to store information about each text field

function renderPage(num, download = false) {
    pageRendering = true;

    pdfDoc.getPage(num).then(function (page) {
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width - 62) + 'px';
        canvas.style.height = Math.floor(viewport.height) + 'px';

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
            canvasContext: context,
            transform: transform,
            viewport: viewport,
        };

        const renderTask = page.render(renderContext);

        renderTask.promise
            .then(function () {
                pageRendering = false;

                if (pageNumPending !== null) {
                    renderPage(pageNumPending, download);
                    pageNumPending = null;
                } else {
                    console.log('There was an error rendering pdf.');
                }

                // Redraw text overlay
                renderTextFields();

                console.log('Canvas width: ', documentCanvas.style.width.replace(/px/, ''))
                console.log('Canvas height: ', documentCanvas.style.height.replace(/px/, ''))

                // Convert canvas to PDF after rendering if it's a download request
                if (download) {
                    convertCanvasToPDF();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}


function loadPDFFromURL() {
    // const pdfURL = pdfURLField.value.trim();
    const pdfURL = 'localhost:8000/templates/custom/pdf/software-development-proposal-template-1702352345704.pdf'

    if (!pdfURL) {
        alert('Please enter a valid PDF URL.');
        return;
    }

    pdfjsLib.getDocument(pdfURL)
        .promise.then(function (pdf) {
            pdfDoc = pdf;
            renderPage(pageNum);
        })
        .catch(function (error) {
            console.error('Error loading PDF:', error);
        });
}

loadPDFFromURL();

// pdfInputField.addEventListener('change', () => {
//     const file = pdfInputField.files[0];

//     // const pdfURL = 'localhost:8000/templates/custom/pdf/software-development-proposal-template-1702352345704.pdf'

//     const reader = new FileReader();
//     reader.onload = function () {
//         const typedArray = new Uint8Array(this.result);
//         pdfjsLib.getDocument({ data: typedArray })
//             .promise.then(function (pdf) {
//                 pdfDoc = pdf;
//                 renderPage(pageNum);
//             })
//             .catch(function (error) {
//                 console.error('Error loading PDF:', error);
//             });
//     };

//     reader.readAsArrayBuffer(file);
//     console.log('Hello from my God..!');
// });

addTextButton.addEventListener('click', () => {
    addText();
});

downloadPDFDocumentButton.addEventListener('click', () => {
    convertCanvasToPDF();
});

function renderTextFields() {
    // Clear only the region where text fields were rendered
    textFields.forEach((textField) => {
        const { left, top, content } = textField.position;
        const textWidth = context.measureText(content).width;
        const textHeight = parseInt(context.font);

        context.clearRect(left, top, textWidth, textHeight);
    });

    // Render the text fields
    textFields.forEach((textField) => {
        const { left, top, content } = textField.position;

        context.fillStyle = 'black';
        context.font = '14px Arial';
        context.fillText(content, left, top);
    });
}

function addText(left, top) {

    const textFieldContainer = document.createElement('div');
    textFieldContainer.classList.add('text-container');
    textFieldContainer.style.position = 'absolute';
    // textFieldContainer.style.margin='0px';
    // textFieldContainer.style.padding='0px';
    textFieldContainer.style.left = '0px';
    textFieldContainer.style.top = '0px';

    const resizableDiv = document.createElement('div');
    resizableDiv.classList.add('resizable');
    resizableDiv.style.display = 'inline-block';
    resizableDiv.style.left = '0px';
    resizableDiv.style.top = '0px';
    resizableDiv.style.margin='0px';
    resizableDiv.style.padding='0px';
    resizableDiv.style.width = '150px';
    resizableDiv.style.height = '25px';
    resizableDiv.style.resize = 'both';
    resizableDiv.style.overflow = 'hidden';
    // resizableDiv.style.overflowWrap = 'break-word';
    // resizableDiv.style.wordBreak = 'break-all';
    resizableDiv.style.textAlign = 'center';
    // resizableDiv.style.whiteSpace = 'nowrap';

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-parent-div');

    const iconGroupOneContainer = document.createElement('div');
    iconGroupOneContainer.classList.add('icons-group-one');

    const iconGroupTwoContainer = document.createElement('div');
    iconGroupTwoContainer.classList.add('icons-group-two');

    const moveTextFieldIcon = createIcon('move-text-field-icon', './icons/move-icon.svg', '10px', '10px', '2px');
    const boldTextIcon = createIcon('bold-text-icon', './icons/font-size.svg', '15px', '15px');
    const transparentBkgIcon = createIcon('tr-icon', './icons/tr-icon.svg', '10px', '10px', '2px');
    const deleteTextFieldIcon = createIcon('delete-icon', './icons/delete-icon.svg', '10px', '10px');

    iconGroupOneContainer.appendChild(moveTextFieldIcon);
    iconGroupOneContainer.appendChild(transparentBkgIcon);
    iconGroupOneContainer.appendChild(boldTextIcon);

    iconGroupTwoContainer.appendChild(deleteTextFieldIcon);

    iconContainer.appendChild(iconGroupOneContainer);
    iconContainer.appendChild(iconGroupTwoContainer);

    textFieldContainer.appendChild(resizableDiv);
    textFieldContainer.appendChild(iconContainer);

    pdfCanvasContainer.appendChild(textFieldContainer);

    const textFieldInfo = {
        id: generateUniqueId(),
        content: '',
        position: {
            left: parseInt(textFieldContainer.style.left, 10) || 0,
            top: parseInt(textFieldContainer.style.top, 10) || 0,
        },
    };

    resizableDiv.addEventListener('dblclick', () => {
        textFieldInfo.contentEditing = !textFieldInfo.contentEditing;
        resizableDiv.contentEditable = textFieldInfo.contentEditing;

        if (!textFieldInfo.contentEditing) {
            textFieldInfo.content = resizableDiv.innerText;
        }
    });

    resizableDiv.addEventListener('input', () => {
        textFieldInfo.content = resizableDiv.innerText;
        // renderTextFields();
    });

    removeTextField(deleteTextFieldIcon, textFieldContainer, textFieldInfo);

    textFields.push(textFieldInfo);

    moveTextField(textFieldContainer, textFieldInfo);
}

function createIcon(className, src, width, height, padding) {
    const icon = document.createElement('img');
    icon.classList.add(className);
    icon.src = src;
    icon.style.width = width;
    icon.style.height = height;
    icon.style.padding = padding;
    return icon;
}

function removeTextField(hanlder, element, textFieldInfo) {
    hanlder.addEventListener('click', () => {
        const index = textFields.indexOf(textFieldInfo);
        if (index !== -1) {
            textFields.splice(index, 1);
        }
        element.remove();
        // renderTextFields();
    });
}

function convertCanvasToPDF() {
    const content = document.getElementById(documentCanvas.id);

    const pdfOptions = {
        margin: 0,
        filename: 'downloaded.pdf',
        image: { type: 'jpeg', quality: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const promise = new Promise((resolve, reject) => {
        html2canvas(content, { scale: 1.1, useCORS: true, allowTaint: true })
            .then((canvas) => {
                resolve(canvas);
            })
            .catch((error) => {
                console.log(error);
                reject(canvas);
            });
    });

    promise.then((canvas) => {
        const pdf = new jsPDF(pdfOptions.jsPDF);

        const docWidth = pdf.internal.pageSize.getWidth();
        const docHeight = pdf.internal.pageSize.getHeight();

        const dataUrl = canvas.toDataURL('image/jpeg', 1);

        pdf.addImage(dataUrl, 'JPEG', pdfOptions.margin, pdfOptions.margin, docWidth, docHeight);

        textFields.forEach((textFieldInfo) => {
            const text = textFieldInfo.content;
            const scaleAdjustedLeft = textFieldInfo.position.left;
            const scaleAdjustedTop = positionCal(textFieldInfo.position.top);

            // console.log(scaleAdjustedTop);

            // Calculate position in millimeters
            const positionX_mm = (scaleAdjustedLeft / canvas.width) * docWidth;
            const positionY_mm = (scaleAdjustedTop / canvas.height) * docHeight;

            console.log('canvas height: ', canvas.height);

            console.log('doc height', )

            console.log('position Y: ', positionY_mm);


            if (!isNaN(positionX_mm) && !isNaN(positionY_mm) && text.trim() !== '') {
                // Adjust the top position based on the font size
                const fontSize = 14; // Assuming a font size of 14px, adjust as needed
                // const textFieldHeight = 25; //Assuming a height size of 25px, adjust as needed
                pdf.text(positionX_mm + fontSize, positionY_mm + fontSize, text);
            } else {
                console.log(`Invalid text, left, or top values for ${textFieldInfo.id}. Text not added to PDF.`);
            }
        });

        pdf.save(pdfOptions.filename);
    });
}

function positionCal(top){
    if(top == 300 && top < 400){
        console.log('first')
        return top+5;
    }
    if(top >= 400){
        console.log('second')
        return top+25;
    }
    return top;
    

}



function moveTextField(textFieldContainer, textFieldInfo) {
    const moveTextFieldIcon = textFieldContainer.querySelector('.move-text-field-icon');

    moveTextFieldIcon.addEventListener('mousedown', startDrag);
    moveTextFieldIcon.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        e.preventDefault();

        textFieldContainer.moving = true;

        if (e.clientX !== undefined && e.clientY !== undefined) {
            textFieldContainer.oldX = e.clientX;
            textFieldContainer.oldY = e.clientY;

            // console.log('textField final info', textFieldInfo)

        } else if (e.touches && e.touches.length > 0) {
            textFieldContainer.oldX = e.touches[0].clientX;
            textFieldContainer.oldY = e.touches[0].clientY;
        } else {
            console.error('Unsupported input type for dragging.');
            return;
        }

        textFieldContainer.oldLeft = textFieldInfo.position.left;
        textFieldContainer.oldTop = textFieldInfo.position.top;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
    }

    function drag(e) {
        e.preventDefault();
    
        if (!textFieldContainer.moving) {
            return;
        }
    
        if (e.clientX !== undefined && e.clientY !== undefined) {
            textFieldContainer.distX = e.clientX - textFieldContainer.oldX;
            textFieldContainer.distY = e.clientY - textFieldContainer.oldY;
        } else if (e.touches && e.touches.length > 0) {
            textFieldContainer.distX = e.touches[0].clientX - textFieldContainer.oldX;
            textFieldContainer.distY = e.touches[0].clientY - textFieldContainer.oldY;
        } else {
            console.error('Unsupported input type for dragging.');
            return;
        }
    
        textFieldContainer.style.left = textFieldContainer.oldLeft + textFieldContainer.distX + 'px';
        textFieldContainer.style.top = textFieldContainer.oldTop + textFieldContainer.distY + 'px';
    
        // Update textFieldInfo during the drag
        textFieldInfo.position = { 
            left: textFieldContainer.offsetLeft, 
            top: textFieldContainer.offsetTop 
        };

        textFieldInfo.size = {
            width: textFieldContainer.offsetWidth,
            height: textFieldContainer.offsetHeight,
        };

        console.log(textFieldInfo);
    
        // renderTextFields();
    }
    

    function endDrag() {
        textFieldContainer.moving = false;

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);

        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', endDrag);
    }
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
