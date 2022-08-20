import {getFileExtension} from "../common/FileUtils";
import {createRef} from "react";
import StyledButton from "./inputs/StyledButton";
import {blobToBase64, getPreFix} from "../common/Base64Utils";

const FileSelect = (props) => {

    const {accept, extensions, multiple, readOnly, disabled, onChange} = {...props}
    const fileInputRef = createRef();

    const fileListToFileArray = (fileList) => Object.values(fileList);

    const processInputFileArray = async (inputFileArray) => {
        const processedFileArray = [];

        for (let file of inputFileArray) {
            let base64 = await blobToBase64(file)
            processedFileArray.push({
                bytes: base64.substring(getPreFix(file.type).length),
                fileName: file.name,
                fileSize: file.size,
                mimeType: file.type
            });
        }

        return processedFileArray;
    }

    const handleFileChange = async (e) => {

        const inputFileArray = fileListToFileArray(e.target.files);

        if (inputFileArray.length !== 0) {

            const isProperExtension = inputFileArray
                .some(file => extensions.includes(getFileExtension(file.name)));

            if (isProperExtension) {

                const processedFileArray = await processInputFileArray(inputFileArray);

                for (const file of processedFileArray) {
                    await onChange(file);
                }
            } else {
                alert("Unsupported file type");
            }
        }
    }

    return (
        <div>
            <input
                id="#fileUploadInput" type="file"
                multiple={multiple} accept={accept}
                onChange={(e) => handleFileChange(e)}
                ref={fileInputRef} hidden={true}
            />
            <StyledButton
                id="#fileUploadButton"
                disabled={disabled} readOnly={readOnly}
                onClick={() => fileInputRef.current.click()}
            >
                Choose File
            </StyledButton>
        </div>
    );
}

export default FileSelect;