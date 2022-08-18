
export const PDF_SMALL_COMPRESS_OPTIONS = {
    pageScale: 1,
    pageQuality: 0.75,
    pageFormat: "image/jpeg"
};

export const PDF_LARGE_COMPRESS_OPTIONS = {
    pageScale: 1,
    pageQuality: 0.45,
    pageFormat: "image/jpeg"
};

export const JPEG_SMALL_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.1,
    pageFormat: "image/jpeg"
};

export const JPEG_LARGE_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.05,
    pageFormat: "image/jpeg"
};

export const PNG_SMALL_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.50,
    pageFormat: "image/jpeg"
};

export const PNG_LARGE_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.25,
    pageFormat: "image/jpeg"
};

export const getFileExtension = (filename) => filename.slice(filename.lastIndexOf(".") + 1).toLowerCase();

export const getBase64PreFix = (mimeType) => `data:${mimeType};base64,`;

export const  getBase64FileSize = (base64Length) => Math.round(4 * Math.ceil((base64Length / 3)) * 0.5624896334383812);

export const getImageObject = data => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = data;
    image.onload = () => resolve(image);
    image.onerror = () => reject("Error cannot create the image");
});

export const setCompressedFileFields = (inputFile, base64String) => {
    const [fileName, fileExtension] = inputFile.fileName.split(".");
    const base64PreFixLength = getBase64PreFix(inputFile.mimeType).length;

    inputFile.bytes = base64String.substring(base64PreFixLength);
    inputFile.fileSize = getBase64FileSize(base64String.length);
    inputFile.fileName = `${fileName}_compressed.${fileExtension}`;
}

export const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.width = width;
    canvas.height = height;

    return canvas;
}

export const createCanvasFromViewPort = (viewPort) => {
    return createCanvas(viewPort.width || viewPort.viewBox[2], viewPort.height || viewPort.viewBox[3]);
}

export const createCanvasContext = (canvas) => {
    return canvas.getContext('2d');
}