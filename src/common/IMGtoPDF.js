import PDFDocument from "pdfkit/js/pdfkit.standalone";
import blobStream from "blob-stream/.js";
import {getImageObject, setCompressedFileFields} from "./FileUtils";

export default class IMGtoPDF {

    async convert(images, inputFile, callBackFunc) {
        this.inputFile = inputFile;
        this.callBackFunc = callBackFunc

        const pdfDoc = this.#createPDF();

        const stream = pdfDoc.pipe(blobStream());

        for (let image of images) {
            let imageObject = await getImageObject(image);
            pdfDoc.addPage({size: [imageObject.width, imageObject.height]});
            pdfDoc.image(imageObject.src, 0, 0);
        }

        pdfDoc.end();

        stream.on("finish", async () => {
            const outputBlob = stream.toBlob("application/pdf");
            let base64String = await this.#blobToBase64(outputBlob);
            setCompressedFileFields(this.inputFile, base64String);
            this.callBackFunc(this.inputFile);
        });
    }

    #createPDF() {
        const pdfDoc = new PDFDocument({ autoFirstPage: false, compress: false });
        const fileName = this.inputFile.fileName.split(".")[0];
        pdfDoc.info = {
            Title: `${fileName}.pdf`,
            Author: "mys",
            Keywords: `${fileName}, pdf`
        };
        return pdfDoc;
    }

    #blobToBase64 (blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("Error cannot convert the pdf");
            reader.readAsDataURL(blob);
        });
    }
}