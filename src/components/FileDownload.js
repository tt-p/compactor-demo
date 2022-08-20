import { saveAs } from 'file-saver';
import StyledButton from "./inputs/StyledButton";
import {getPreFix} from "../common/Base64Utils";

const style = {
    li: {
        padding: "0px 10px 10px 10px"
    },
    button: {
        width: "100%",
        textAlign: "start"
    }
}

const FileDownload = (props) => {

    const file = props.file;
    const nameLimit = props.nameLimit - 3;

    const downloadFile = () => {
        saveAs((getPreFix(file.mimeType) + file.bytes), file.fileName);
    }

    const renderFileName = () => {
        let fileName = file.fileName;

        return fileName.length < nameLimit ? fileName :
            `${fileName.slice(0, fileName.lastIndexOf(".")).slice(0, nameLimit)}...`;
    }

    return (
        <li style={style.li}>
            <StyledButton
                onClick={downloadFile}
                style={style.button}
            >
                {renderFileName()}
            </StyledButton>
        </li>
    );
}

export default FileDownload;