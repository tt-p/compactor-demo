import {createCanvasContext, createCanvasFromViewPort} from "./FileUtils";

export default class PDFtoIMG {

    convert(inputFile, options) {
        this.inputFile = inputFile;
        this.pageCount = inputFile.numPages;
        this.pageFormat = options.pageFormat;
        this.pageScale = options.pageScale;
        this.pageQuality = options.pageQuality;
        this.canvas = null;

        return this.#renderAllPages();
    }

    async #renderAllPages() {
        let images = [];
        for (let i = 1; i <= this.pageCount; i++) {
            let page = await this.#renderPage(i);
            images.push(JSON.parse(JSON.stringify(page)));
        }

        this.canvas.remove();

        return images;
    }

    async #renderPage(pageNum) {

        return this.inputFile.getPage(pageNum).then(page => {

            const viewPort = page.getViewport({scale: 1});
            this.canvas = createCanvasFromViewPort(viewPort);
            const canvasContext = createCanvasContext(this.canvas);
            const renderTaskParams = {canvasContext: canvasContext, viewport: viewPort}
            const renderTask = page.render(renderTaskParams);

            return renderTask.promise.then(() => this.canvas.toDataURL(this.pageFormat, this.pageQuality));
        });
    };

}