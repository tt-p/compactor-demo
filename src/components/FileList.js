import FileLink from "./FileLink";

const style = {
    ul: {
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        listStyleType: "none",
        listStylePosition: "outside",
    },
    div: {
        margin: 0,
        padding: "0 10px",
        display: "flex",
        alignItems: "center"
    }
}

const FileList = (props) => {

    const fileArray = props.fileArray;

    const renderFileList = () => fileArray
            .map(file => <FileLink
                key={file.fileName}
                file={file}
                nameLimit={20}
            />);

    return ( fileArray.length === 0 ?
            <div style={style.div}>
                No file chosen
            </div> :
            <div>
                <ul
                    id="#fileUploadFileList"
                    style={style.ul}
                >
                    {renderFileList()}
                </ul>
            </div>

    );
}

export default FileList;