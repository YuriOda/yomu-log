import NewTitle from "../component/NewPost/NewTitle";
import HeaderCancel from "../component/Header/HeaderCancel";

const FindBook = () => {
  return (
    <div className="main-wrapper">
      <HeaderCancel to="/" className="header-cancel-title" />
      <NewTitle />
    </div>
  );
};

export default FindBook;
