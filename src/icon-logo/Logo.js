import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Logo = (props) => {
  return (
    <div className="logo-div">
      <h1 className="logo">Yomu Log</h1>
      <FontAwesomeIcon icon={faBookOpen} className="icon-logo" />
    </div>
  );
};

export default Logo;
