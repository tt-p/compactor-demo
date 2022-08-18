import * as pdfjsLib from "pdfjs-dist";
import PDFJSWorker from "pdfjs-dist/build/pdf.worker.entry";

import PDFReader from "./PDFReader";
import PDFtoIMG from "./PDFtoIMG";
import IMGtoPDF from "./IMGtoPDF";
import {getBase64PreFix} from "./FileUtils";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const pdfReader = new PDFReader(pdfjsLib);
const imgConverter = new PDFtoIMG();
const pdfConverter = new IMGtoPDF();

export const compressPDF = async (inputFile, callbackFunc, options) => {

    const pdfDoc = await pdfReader.read(getBase64PreFix(inputFile.mimeType) + inputFile.bytes);
    const images = await imgConverter.convert(pdfDoc, options);
    await pdfConverter.convert(images, inputFile, callbackFunc);
}