import StyledButton from "./inputs/StyledButton";
import {getPreFix} from "compactor/src/util/Base64Utils";

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
    const base64 = (getPreFix(file.mimeType) + file.bytes);

    const openFile = () => {
        const win = window.open("about:blank");

        const iframe = win.document.body.appendChild(document.createElement("iframe"));
        iframe.src = base64;
        win.document.body.style.margin = "0";
        win.document.getElementsByTagName("iframe")[0].style.width = "100%";
        win.document.getElementsByTagName("iframe")[0].style.height = "100%";
        win.document.getElementsByTagName("iframe")[0].style.border = "0";
    }

    const renderFileName = () => {
        let fileName = file.fileName;

        return fileName.length < nameLimit ? fileName :
            `${fileName.slice(0, fileName.lastIndexOf(".")).slice(0, nameLimit)}...`;
    }

    return (
        <StyledButton
            onClick={openFile}
            style={style.button}
        >
            {renderFileName()}
        </StyledButton>
    );
}

export default FileLink;