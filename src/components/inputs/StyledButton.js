import "./StyledButton.css";

const StyledButton = (props) => {

    const {id, disabled, readOnly, onClick, style} = {...props}

    const onClickHandler = (e) => {
        if (readOnly) {
            e.preventDefault();
        } else {
            onClick(e);
        }
    }

    return (
        <div
            className={"StyledButton "}
        >
            <button
                id={id} type="button"
                disabled={disabled}
                onClick={readOnly ? () => {} : onClickHandler}
                style={style}
            >
                {props.children}
            </button>
        </div>
    )

}

export default StyledButton;