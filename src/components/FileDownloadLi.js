import FileDownload from "./FileDownload";

const style = {
    li: {
        padding: "0px 10px 10px 10px"
    },
    button: {
        width: "100%",
        textAlign: "start"
    }
}

const FileDownloadLi = (props) => {

    const file = props.file;
    const nameLimit = props.nameLimit;

    return (
        <li style={style.li}>
            <FileDownload file={file} nameLimit={nameLimit} />
        </li>
    );
}

export default FileDownloadLi;