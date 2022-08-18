import {compressPDF} from "./PDFCompress";
import {compressIMG} from "./IMGCompress";
import {
    PDF_LARGE_COMPRESS_OPTIONS,
    PDF_SMALL_COMPRESS_OPTIONS
} from "./FileUtils";

export const compress = async (inputFile, callbackFunc, largeCompress) => {

    const mimeType = inputFile.mimeType;

    if (mimeType === "application/pdf") {
        await compressPDF(inputFile, callbackFunc, largeCompress ? PDF_LARGE_COMPRESS_OPTIONS : PDF_SMALL_COMPRESS_OPTIONS);
    } else if (mimeType === "image/jpeg" || mimeType === "image/png") {
        await compressIMG(inputFile, callbackFunc, largeCompress);
    } else {
        console.log(`Error cannot compress mime type: ${mimeType}`);
    }

}