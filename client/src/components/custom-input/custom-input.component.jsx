import "./custom-input.styles.scss";
import { useState, useEffect } from "react";
const CustomInput = ({
  bgColor,
  name,
  label,
  msg,
  isShort,
  type,
  register,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [inputType, setInputType] = useState(null);
  const [inputIconUrl, setInputIconUrl] = useState("");
  const [isIconAvailable, setIconAvailability] = useState(true);

  useEffect(() => {
    const availableIcons = ["email", "number", "password"];
    setIconAvailability(availableIcons.includes(type));
    setInputIconUrl(`/icons/${type}.png`);
    setInputType(type);
  }, [type]);

  function toogleShow() {
    setShowPassword((show) => !show);
    setInputType((type) => (type === "password" ? "text" : "password"));
  }

  // these styles applies on input based
  const withoutIconStyles = !isIconAvailable ? { padding: "10px" } : {};
  const customBackground = bgColor ? { backgroundColor: bgColor } : {};

  // these styles applies on label
  const noIconLabelStyles = !isIconAvailable ? { left: "10px" } : {};

  return (
    <div className="custom-input">
      <input
        className="input"
        type={inputType || "text"}
        {...register}
        style={{ ...customBackground, ...withoutIconStyles }}
        name={name}
        id={name}
        {...otherProps}
      />
      <label
        style={{ ...noIconLabelStyles }}
        htmlFor={name}
        className={`label ${isShort && 'uppercase'}`}
      >
        {label || name}
      </label>
      {isIconAvailable && (
        <div className="input-icon">
          <img src={inputIconUrl} alt="icon" />
        </div>
      )}
      <p className="msg">{msg}</p>
      {type === "password" && (
        <div className="show-hide" onClick={toogleShow}>
          <img
            style={{ opacity: showPassword ? 1 : 0.5 }}
            src={showPassword ? "/icons/eye.png" : "/icons/eye-closed.png"}
            alt="show-hide"
          />
        </div>
      )}
    </div>
  );
};
export default CustomInput;
