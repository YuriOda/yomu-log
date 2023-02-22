const Button = (props) => {
  return (
    <button
      className={`button-primary ${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
