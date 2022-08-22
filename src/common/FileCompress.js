import {compressPDF} from "./PDFCompress";
import {compressIMG} from "./IMGCompress";

export const compress = async (inputFile, callbackFunc, options) => {

    const mimeType = inputFile.mimeType;

    if (mimeType === "application/pdf") {
        await compressPDF(inputFile, callbackFunc, options);
    } else if (mimeType === "image/jpeg" || mimeType === "image/png") {
        await compressIMG(inputFile, callbackFunc, options);
    } else {
        console.log(`Error cannot compress mime type: ${mimeType}`);
    }

}