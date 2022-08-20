import readPDF from "./PDFReader";
import convertPDFtoIMG from "./PDFtoIMG";
import {getPreFix} from "./Base64Utils";
import convertIMGtoPDF from "./IMGtoPDF";

export const compressPDF = async (inputFile, callbackFunc, options) => {
    const pdfDocumentProxy = await readPDF(getPreFix(inputFile.mimeType) + inputFile.bytes);
    const images = await convertPDFtoIMG(pdfDocumentProxy, options);
    await convertIMGtoPDF(images, inputFile, callbackFunc);
}