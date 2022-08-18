import {getFileExtension} from "../common/FileUtils";
import {createRef, useState} from "react";
import FileList from "./FileList";
import StyledButton from "./inputs/StyledButton";

const style = {
    container: {
        marginTop: "20%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    component: {
        display: "flex",
        flexDirection: "row"
    }
}

const FileUpload = (props) => {

    const {accept, extensions, multiple, readOnly, disabled, onChange} = {...props}
    const fileInputRef = createRef();

    const [fileArray, setFileArray] = useState([]);

    const fileListToFileArray = (fileList) => Object.values(fileList);

    const readBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace(/^data:.+(;base64)?,/, ''));
        reader.onerror = (error) => reject(error);
    });

    const processInputFileArray = async (inputFileArray) => {
        const processedFileArray = [];

        for (let file of inputFileArray) {
            processedFileArray.push({
                bytes: await readBase64(file),
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
                await onChange(processedFileArray);
                setFileArray(multiple ? [...fileArray].concat([...processedFileArray]) : [...processedFileArray]);
            } else {
                alert("Unsupported file type");
            }
        }
    }

    return (
        <div
            id="#fileUpload"
            style={style.container}
        >
            <input
                id="#fileUploadInput" type="file"
                multiple={multiple} accept={accept}
                onChange={(e) => handleFileChange(e)}
                ref={fileInputRef} hidden={true}
            />
            <div style={style.component}>
                <StyledButton
                    id="#fileUploadButton"
                    disabled={disabled} readOnly={readOnly}
                    onClick={() => fileInputRef.current.click()}
                >
                    Choose File
                </StyledButton>
                <FileList fileArray={fileArray || []} />
            </div>
        </div>
    );
}

export default FileUpload;