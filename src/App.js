import './App.css';
import FileUpload from "./components/FileUpload";

const accept = "image/JPEG, image/PNG, application/PDF";
const extensions = ["jpeg", "jpg", "png", "pdf"];


function App() {
  return (
      <div className="App">
          <FileUpload
              multiple={true} accept={accept} extensions={extensions}
              readOnly={false} disabled={false}
              onChange={(fileList) => {
                  console.log(fileList);
              }}
          />
      </div>
  );
}

export default App;
