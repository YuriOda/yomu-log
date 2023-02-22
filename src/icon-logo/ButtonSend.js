import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ButtonSend = (props) => {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );
};

export default ButtonSend;
