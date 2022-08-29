import {useState} from "react";
import {compressFile} from "compactor";
import FileUpload from "./components/FileUpload";
import Slider from "./components/inputs/Slider";
import {FileProvider} from "./context/FileContext";
import FileTable from "./components/FileTable";

const style = {
    center: {
        paddingTop: "20%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }
}

const accept = "application/PDF";
const extensions = ["png", "jpeg", "jpg", "pdf"];


function App() {

    const defaultScale = 1.0;
    const defaultQuality = 0.75;

    const [scale, setScale] = useState(defaultScale);

    const [quality, setQuality] = useState(defaultQuality);

    const compressFunc = async (file, callback) => {
        return await compressFile(file, callback, {pageScale: scale, pageQuality: quality});
    }

    return (
        <div style={style.center}>
            <div style={style.container}>
                <Slider
                    label={"Scale"}
                    defaultValue={defaultScale} fpDigits={2}
                    upperBound={2}
                    onChange={(val) => setScale(val)}
                />
                <Slider
                    label={"Quality"}
                    defaultValue={defaultQuality} fpDigits={2}
                    upperBound={1}
                    onChange={(val) => setQuality(val)}
                />
                <FileProvider>
                    <FileUpload
                        multiple={true} accept={accept} extensions={extensions}
                        readOnly={false} disabled={false}
                        onChange={compressFunc}
                    />
                    <FileTable />
                </FileProvider>
            </div>
        </div>
    );
}

export default App;
