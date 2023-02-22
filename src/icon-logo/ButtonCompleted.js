import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ButtonCompleted = (props) => {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>
      <FontAwesomeIcon icon={faCheck} />
    </button>
  );
};

export default ButtonCompleted;
