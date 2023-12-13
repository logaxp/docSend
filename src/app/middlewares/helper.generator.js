const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs').promises;
const puppeteer = require('puppeteer');

const pdfTemplateGenerator = async (title, content) =>{

    // Initiate Puppeteer
    const browser = await puppeteer.launch({headless: 'new'});
    
    try{
        dotenv.config();
        const storage = process.env.CUSTOM_PDF_TEMPLATE_STORAGE_LOCATION || '/';


         // Constant variable declaration
         const pdfWidth = 800;
         const pdfHeight = 1200;

         // New Custom Template creation
         const page = await browser.newPage();

         // Set the width and height of the PDF page (in pixels)
         await page.pdf({
             format: 'A4',
             width: `${pdfWidth}px`,
             height: `${pdfHeight}px`,
         });

         // Add content with dynamic font size, word wrapping, and margins
         const maxFontSize = 20; // Adjust as needed
         const minFontSize = 15; // Adjust as needed
         const maxContentWidth = pdfWidth - 50; // Adjust as needed
         const paddingLeft = 50;
         const paddingRight = 50;
         const marginTop = 10; // Adjust as needed
        //  const marginLeft = 10; // Adjust as needed
        //  const marginRight = 30; // Adjust as needed

         // Function to calculate font size, apply word wrapping, and add padding
         const adjustFontSizeAndWrap = (fontSize) => {
            return page.evaluate(
                (content, fontSize, maxContentWidth, paddingLeft, paddingRight) => {
                    const div = document.createElement('div');
                    div.style.fontSize = `${fontSize}px`;
                    div.style.width = `${maxContentWidth}px`;
                    div.style.paddingLeft = `${paddingLeft}px`;
                    div.style.paddingRight = `${paddingRight}px`;
                    div.style.wordWrap = 'break-word';
                    div.textContent = content;
                    document.body.appendChild(div);
                    const height = div.offsetHeight;
                    document.body.removeChild(div);
                    return height;
                },
                content,
                fontSize,
                maxContentWidth,
                paddingLeft,
                paddingRight
            );
        };
        
        // Calculate font size without setting content
        const calculateFontSize = (fontSize) => {
            return page.evaluate(
                (fontSize) => {
                    const div = document.createElement('div');
                    div.style.fontSize = `${fontSize}px`;
                    div.style.visibility = 'hidden';
                    document.body.appendChild(div);
                    const width = div.offsetWidth;
                    const height = div.offsetHeight;
                    document.body.removeChild(div);
                    return { width, height };
                },
                fontSize
            );
        };
        
        // Add content and adjust padding on new page
        page.on('page', async () => {
            // Adjust padding at the top for a new page
            await page.setContent(`<div style="margin-top: ${paddingTop}px;"></div>`);
        });
        
        // Binary search for optimal font size
        let low = minFontSize;
        let high = maxFontSize;
        let fontSize = 0;
        
        while (low <= high) {
            fontSize = Math.floor((low + high) / 2);
        
            const height = adjustFontSizeAndWrap(fontSize);
        
            if (height <= pdfHeight - marginTop) {
                low = fontSize + 1;
            } else {
                // Adjust paddingTop for the new page
                const { height: newPageHeight } = calculateFontSize(fontSize);
                paddingTop = pdfHeight - newPageHeight;
                high = fontSize - 1;
            }
        }
        
        // Set the content with the adjusted font size and padding
        const adjustedContent = `<div style="font-size: ${fontSize}px; width: ${maxContentWidth}px; margin-top: ${marginTop}px; padding-left: ${paddingLeft}px; padding-right: ${paddingRight}px; word-wrap: break-word;">${content}</div>`;
        await page.setContent(adjustedContent);
        
        // Set the viewport size to match the PDF page size
        await page.setViewport({
            width: pdfWidth,
            height: pdfHeight,
        });
        
        // Set the width and height of the PDF page (in pixels)
        const pdfFormat = await page.pdf({
            margin: {
                top: '100px', 
                bottom: '100px',
                left: '20px',
                right: '20px'
            }, 
            format: 'A4'
        });

         // GetTime in millisecs(1701916663157)
         const timeStamp = new Date().getTime();

         // Replace space in template name with hyphun(-)
         const templateName = title.toLowerCase().replace(/ /g, '-');

         await fs.writeFile(path.join(storage, `${templateName}-${timeStamp}.pdf`), pdfFormat);

         return true;

    }catch(error){
        console.error(error.message);
    }finally {
        await browser.close();
    }
}

module.exports = {
    pdfTemplateGenerator,
}

