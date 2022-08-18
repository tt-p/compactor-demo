import { saveAs } from 'file-saver';
import {getBase64PreFix} from "../common/FileUtils";
import StyledButton from "./inputs/StyledButton";

const style = {
    li: {
        padding: "0px 10px 10px 10px"
    },
    button: {
        width: "100%",
        textAlign: "start"
    }
}

const FileLink = (props) => {

    const file = props.file;
    const nameLimit = props.nameLimit - 3;

    const downloadFile = () => {
        saveAs((getBase64PreFix(file.mimeType) + file.bytes), file.fileName);
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

export default FileLink;