import {useContext} from "react";
import {FileContext} from "../context/FileContext";
import {hashCode} from "compactor/src/util/StringUtils";
import "./FileTable.css"
import FileLink from "./FileLink";
import FileDownload from "./FileDownload";

const FileTable = () => {

    const fileArray = useContext(FileContext);

    const renderFileList = () => fileArray.map(file =>
        <tr key={hashCode(file.fileName + file.isProcessed)}>
            <td>{file.fileName}</td>
            <td>{file.mimeType}</td>
            <td>{`${Math.round(file.fileSize * 0.001)} KB`}</td>
            <td>{file.isProcessed ? "Yes" : "No"}</td>
            <td>{<FileLink file={file} nameLimit={20}/>}</td>
            <td>{<FileDownload file={file} nameLimit={20}/>}</td>
        </tr>
    );

    return ( fileArray.length === 0 ?
            null :
            <div className={"TableContainer "}>
                <table className={"FileTable "}>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Mime Type</th>
                            <th>File Size</th>
                            <th>Compressed</th>
                            <th>Link</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderFileList()}
                    </tbody>
                </table>
            </div>
    );
}

export default FileTable;