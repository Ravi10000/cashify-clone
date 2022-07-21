import "./custom-input.styles.scss";
import { useState, useEffect } from "react";
const CustomInput = ({
  bgColor,
  name,
  label,
  msg,
  isShort,
  type,
  validateInput,
  register,
  ...otherProps
}) => {
  const [show, setShow] = useState(true);
  const [inputType, setType] = useState(null);
  const [iconUrl, setUrl] = useState("");
  const [isIconAvailable, setAvailability] = useState(true);
  // let iconUrl =
  //   let isIconAvailable = ;

  console.log(type, iconUrl);
  useEffect(() => {
    setAvailability(["email", "number", "password"].includes(type));
    setUrl(`/icons/${type}.png`);
    setType(type);
  }, [type]);

  function toogleShow(e) {
    setShow((show) => !show);
    setType((type) => (type === "password" ? "text" : "password"));
  }
const withoutIconStyles =  !isIconAvailable ? {padding: '10px'} : {}
const customBackground = bgColor ? {backgroundColor: bgColor} : {};
const noIconLabelStyles = !isIconAvailable ? {left: '10px'} : {}

  return (
    <div className="custom-input">
      <input
        type={inputType ? inputType : "text"}
        {...register}
        style={{...customBackground, ...withoutIconStyles}}
        name={name}
        id={name}
        onBlur={validateInput}
        {...otherProps}
        className="input"
        autoComplete="off"
      />
      <label
      style={{...noIconLabelStyles}}
        htmlFor={name}
        className={`label ${isShort ? "uppercase" : "capitalize"}`}
      >
        {label ? label : name}
      </label>
      {isIconAvailable && (
        <div className="input-icon">
          <img src={iconUrl} alt="icon" />
        </div>
      )}
      <p className="msg"></p>
      {type === "password" && (
        <div className="show-hide" onClick={toogleShow}>
          <img
          style={{opacity: show ? 1 : .5}}
            src={show ? "/icons/eye.png" : "/icons/eye-closed.png"}
            alt="show"
          />
        </div>
      )}
    </div>
  );
};
export default CustomInput;
