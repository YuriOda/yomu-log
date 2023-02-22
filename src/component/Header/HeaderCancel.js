import { Link } from "react-router-dom";

const HeaderCancel = (props) => {
  return (
    <div id="header-cancel">
      <Link to={props.to} className={`cancel-button ${props.className}`}>
        cancel
      </Link>
    </div>
  );
};

export default HeaderCancel;
