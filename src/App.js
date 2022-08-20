import FileUpload from "./components/FileUpload";
import {compress} from "./common/FileCompress";

const style = {
    container: {
        paddingTop: "40%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    }
}

const accept = "application/PDF";
const extensions = ["pdf"];
const compressFunc = async (file, callback) =>
    await compress(file, callback, true);

function App() {

    return (
        <div style={style.container}>
            <FileUpload
                multiple={true} accept={accept} extensions={extensions}
                readOnly={false} disabled={false}
                onChange={compressFunc}
            />
        </div>
    );
}

export default App;
