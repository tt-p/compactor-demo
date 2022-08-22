import FileLink from "./FileLink";
import {hashCode} from "../common/StringUtils";
import {useContext} from "react";
import {FileContext} from "../context/FileContext";

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

    const id = props.id;
    const filterFunc = props.filterFunc;

    const fileArray = useContext(FileContext);

    const renderFileList = () => fileArray
        .filter(filterFunc)
        .map(file =>
            <FileLink
                key={hashCode(String(file.fileName + id))}
                file={file} nameLimit={20}
            />
    );

    return ( fileArray.length === 0 ?
            <div
                id="#fileUploadFileList"
                style={style.div}
            >
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