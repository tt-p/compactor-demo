import {
    createCanvas,
    createCanvasContext,
    getImageObject,
    JPEG_LARGE_COMPRESS_OPTIONS,
    JPEG_SMALL_COMPRESS_OPTIONS,
    PNG_LARGE_COMPRESS_OPTIONS,
    PNG_SMALL_COMPRESS_OPTIONS,
    setCompressedFileFields
} from "./FileUtils";
import {getPreFix} from "./Base64Utils";

export const compressIMG = async (inputFile, callbackFunc, largeCompress) => {

    let options;

    if (inputFile.mimeType === "image/jpeg") {
        options = largeCompress ? JPEG_LARGE_COMPRESS_OPTIONS : JPEG_SMALL_COMPRESS_OPTIONS;
    } else if (inputFile.mimeType === "image/png") {
        options = largeCompress ? PNG_LARGE_COMPRESS_OPTIONS : PNG_SMALL_COMPRESS_OPTIONS;
    }

    const image = await getImageObject(getPreFix(options.pageFormat) + inputFile.bytes);

    const width = image.width;
    const height = image.height;

    const canvas = createCanvas(width, height);
    const canvasContext = createCanvasContext(canvas);
    canvasContext.drawImage(image, 0, 0, width, height);

    const base64String = await new Promise((resolve, _) =>
        resolve(canvas.toDataURL(options.pageFormat, options.pageQuality)));

    canvas.remove();

    inputFile.fileName = inputFile.fileName.split(".")[0] + ".jpg";
    inputFile.mimeType = "image/jpeg";
    setCompressedFileFields(inputFile, base64String);

    callbackFunc(inputFile);
}