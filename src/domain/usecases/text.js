// // set page consts
            // const _x = 500 // width
            // const _y = 600 // height
            // const _d = 2 // divider

            // // Document Header
            // const h1 = 20
            // const h2 = 18
            // const h3 = 16
            // const h4 = 14
            // const h5 = 12
            // const h6 = 9

            // // Initiate new Document Page
            // const pdfDoc = await PDFDocument.create();
            // const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

            // // Add document page
            // const page = pdfDoc.addPage();

            // // Set the maximum width for the content before wrapping
            // const maxWidth = page.getWidth() - 50;

            // // Function to add content to PDF canvas with wrapping
            // const addWrappedContent = (text, x, y, maxWidth, leftMargin, rightMargin) => {
            //     let currentX = x + leftMargin;
            //     let currentY = y;

            //     const fontSize = 14; // Adjust to increase or decrease font size
            //     const spaceBetweenWords = 15; // Word spacing
            //     const textHeight = 20;

            //     for (const word of text.split(' ')) {
            //     const wordWidth = font.widthOfTextAtSize(word, spaceBetweenWords);
            //     if (currentX + wordWidth > maxWidth - rightMargin) {
            //         // Start a new line or page
            //         currentX = x + leftMargin;
            //         currentY -= textHeight; // Adjust the value based on your needs
            //         if (currentY < 0) {
            //         // Start a new page if needed
            //         const newPage = pdfDoc.addPage();
            //         currentY = newPage.getHeight() - 50;
            //         }
            //     }

            //     page.drawText(word, { x: currentX, y: currentY, font: font, size: fontSize });
            //     currentX += wordWidth + 5;

            //     }
            // };

            // // Add the content with wrapping, left margin, and right margin
            // const leftMargin = 80;
            // const rightMargin = 20;
            // addWrappedContent(
            //     templateData.content, 
            //     5, 
            //     page.getHeight() - 50, 
            //     maxWidth, 
            //     leftMargin, 
            //     rightMargin
            // );

            // // Save file or send as a response
            // const pdfBytes = await pdfDoc.save();

            // // getTime in millisecs(1701916663157)
            // const timeStamp = new Date().getTime();

            // // Replace space in template name with hyphun(-)
            // const templateName = templateData.name.toLowerCase().replace(/ /g, '-');
            
            // // Use path.join for handling file paths in a platform-independent way
            // const filePath = path.join(storage, `${templateName}-${timeStamp}.pdf`);

            // // Use async writeFile to handle asynchronous file writing
            // await fs.promises.writeFile(filePath, pdfBytes);

            // console.log("Template created successfully!");
            // return;




            // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.search-box__link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();







            // const richTextContent = `
            //     <p>This is <strong>rich text</strong> content.</p>
            //     <ul>
            //         <li>Item 1</li>
            //         <li>Item 2</li>
            //         <li>Item 3</li>
            //     </ul>
            //     `;

            //     const pdfOptions = { format: 'Letter' };

            //     html_to_pdf.create(richTextContent, pdfOptions).toFile('output.pdf', (err, res) => {
            //     if (err) return console.log(err);
            //     console.log('PDF saved:', res.filename);
            //     });














// COMING FROM  JS FONT-END

            
        // editableContents.forEach(({ element, x, y }) => {
        //     const editText = element.innerText;
        //     const firstPage = pdfDoc.getPages()[0];

        //     // Dynamically set the position based on the editableContent position in points
        //     const { x: pointsX, y: pointsY } = pixelsToPoints({ x, y });

        //     // Get dynamic color
        //     const fontColor = setTextColor();

        //     // Get fontSize base on user's choice
        //     const fontSize =  setFontSize();

        //     firstPage.drawText(`${editText}`, {
        //     x: pointsX, // x: pointsX - 85.1,
        //     y: firstPage.getSize().height - pointsY, // Invert Y-axis for correct positioning
        //     size: fontSize,
        //     color: rgb(fontColor.red, fontColor.green, fontColor.blue),
        //     });
        // });

        // Save the modified PDF