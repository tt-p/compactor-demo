export default class PDFReader {

    constructor(pdfjsLib) {
        this.pdfjsLib = pdfjsLib;
    }

    read(pdf_url) {
        return new Promise((resolve, reject) => {
            this.pdfjsLib.getDocument(pdf_url).promise.then(
                document => resolve(document),
                () => reject("Error cannot read the pdf")
            );
        });
    }

}