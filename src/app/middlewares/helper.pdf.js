const { PDFDocument } = require('pdf-lib');




async function addContent(title, body){

    // initialize pdf-lib
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();


    // Function to add content to the current page
    const addContentToPage = (body) => {
        // You may need to adjust the coordinates based on your content and page size
        page.drawText(text, { x: 50, y: 500 });
    };

    // Function to check if content exceeds the page width
    const contentExceedsWidth = (text) => {
        const { width } = page.getFont().getTextDimensions(text);
        return width > page.getWidth();
    };

    // Split the content into chunks that fit within the page width
    while (content.length > 0) {
        // Find the maximum chunk that fits within the page width
        let chunk = content;
        while (contentExceedsWidth(chunk)) {
        chunk = chunk.slice(0, -1);
        }

        // Add the chunk to the current page
        addContentToPage(chunk);

        // Remove the processed chunk from the content
        content = content.slice(chunk.length);

        // Check if there's more content and add a new page if needed
        if (content.length > 0) {
        page = pdfDoc.addPage();
        }
    }

    const pdfBytes = await pdfDoc.save();


    
}


module.exports = {
    addContent,
}






