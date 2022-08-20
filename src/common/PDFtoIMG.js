import {createCanvasContext, createCanvasFromViewport} from "./FileUtils";

const convertPDFtoIMG = (pdfDocumentProxy, options) => {
    return renderAllPages(pdfDocumentProxy, options);
}

const renderAllPages = async (file, options) => {

    const pageFormat = options.pageFormat;
    const pageScale = options.pageScale;
    const pageQuality = options.pageQuality;

    let images = [];

    for (let i = 1; i <= file.numPages; i++) {
        let pdfPageProxy = await file.getPage(i);
        let renderedPage = await renderPage(pdfPageProxy, pageFormat, pageScale, pageQuality);
        images.push(JSON.parse(JSON.stringify(renderedPage)));
    }

    return images;
}

const renderPage = async (pdfPageProxy, pageFormat, pageScale, pageQuality) => {
    const pageViewport = pdfPageProxy.getViewport({scale: pageScale});
    const canvas = createCanvasFromViewport(pageViewport);
    const canvasContext = createCanvasContext(canvas);
    const renderTaskParams = {canvasContext: canvasContext, viewport: pageViewport}

    await pdfPageProxy.render(renderTaskParams).promise;

    const base64 = canvas.toDataURL(pageFormat, pageQuality);

    canvas.remove();

    return base64;
};

export default convertPDFtoIMG;