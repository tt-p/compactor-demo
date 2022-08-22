import {useState} from "react";

const style = {
    div: {
        padding: "2rem 0rem",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    label: {
        padding: "0.5rem 0rem",
    },
    input: {
        padding: "0.5rem 0rem",
        width: "100%"
    }
}

const Slider = (props) => {

    const {label, defaultValue, fpDigits, onChange} = {...props}

    const max = 10 ** fpDigits;

    const adjustValue = (e) => e / max;

    const readjustValue = (e) => e * max;

    const [value, setValue] = useState((readjustValue(defaultValue)) || 0);


    const handleOnchange = (e) => {
        setValue(e.target.value);
        onChange(adjustValue(value));
    }

    return (
        <div style={style.div}>
            <label style={style.label}>
                {`${label}: ${adjustValue(value)}`}
            </label>
            <input
                style={style.input}
                type="range"
                value={value}
                min={0} max={max}
                onChange={handleOnchange}
            />
        </div>
    );
}

export default Slider;