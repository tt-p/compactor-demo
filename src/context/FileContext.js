import {createContext, useState} from "react";

const FileContext = createContext(undefined);
const FileDispatchContext = createContext(undefined);

const FileProvider = ({children}) => {

    const [fileArray, setFileArray] = useState([]);

    return (
        <FileContext.Provider value={fileArray}>
            <FileDispatchContext.Provider value={setFileArray}>
                {children}
            </FileDispatchContext.Provider>
        </FileContext.Provider>
    )
}

export {FileProvider, FileContext, FileDispatchContext};