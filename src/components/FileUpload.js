import {useState} from "react";
import FileSelect from "./FileSelect";
import FileList from "./FileList";

const style = {
    div: {
        display: "flex",
        flexDirection: "row"
    }
}

const FileUpload = (props) => {

    const {accept, extensions, multiple, readOnly, disabled, onChange} = {...props}

    const [fileArray, setFileArray] = useState([]);

    const addFileCallback = (file) => {
        setFileArray(fileArray => [...fileArray, file]);
    }

    return (
        <div style={style.div}>
            <FileSelect
                multiple={multiple} accept={accept} extensions={extensions}
                readOnly={readOnly} disabled={disabled}
                onChange={(file) => onChange(file, addFileCallback)}
            />
            <FileList id={"compressed"} items={fileArray} />
        </div>
    );
}

export default FileUpload;