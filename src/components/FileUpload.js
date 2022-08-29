import {useContext} from "react";
import FileSelect from "./FileSelect";
import {FileDispatchContext} from "../context/FileContext";

const style = {
    div: {
        display: "flex",
        flexDirection: "row"
    }
}

const FileUpload = (props) => {

    const {accept, extensions, multiple, readOnly, disabled, onChange} = {...props}

    const setFileArray = useContext(FileDispatchContext);

    const addFileCallback = (file) => {
        file["isProcessed"] = true;
        setFileArray(fileArray => [...fileArray, file]);
    }

    return (
        <div style={style.div}>
            <FileSelect
                multiple={multiple} accept={accept} extensions={extensions}
                readOnly={readOnly} disabled={disabled}
                onChange={(file) => onChange(file, addFileCallback)}
            />
        </div>
    );
}

export default FileUpload;