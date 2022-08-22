import {useContext} from "react";
import {FileContext} from "../context/FileContext";
import {hashCode} from "../common/StringUtils";
import "./FileTable.css"

const FileTable = () => {

    const fileArray = useContext(FileContext);

    const renderFileList = () => fileArray.map(file =>
        <tr key={hashCode(file.fileName + file.isProcessed)}>
            <td>{file.fileName}</td>
            <td>{file.mimeType}</td>
            <td>{`${Math.round(file.fileSize * 0.001)} KB`}</td>
            <td>{file.isProcessed ? "Yes" : "No"}</td>
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