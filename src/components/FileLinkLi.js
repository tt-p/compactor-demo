import FileLink from "./FileLink";

const style = {
    li: {
        padding: "0px 10px 10px 10px"
    },
    button: {
        width: "100%",
        textAlign: "start"
    }
}

const FileLinkLi = (props) => {

    const file = props.file;
    const nameLimit = props.nameLimit;

    return (
        <li style={style.li}>
            <FileLink file={file} nameLimit={nameLimit} />
        </li>
    );
}

export default FileLinkLi;