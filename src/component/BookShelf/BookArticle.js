import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const BookArticle = (props) => {
  const date = `${props.date.month}/${props.date.day}/${props.date.year}`;

  return (
    <>
      <li className="article" id={props.id}>
        <div className="article-header">
          <span className="article-date">{date}</span>
          <div>
            <FontAwesomeIcon
              icon={faPen}
              className="article-icon"
              onClick={props.onEdit}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="article-icon trash"
              onClick={props.onDelete}
            />
          </div>
        </div>
        <div className="article-text">{props.article}</div>
      </li>
    </>
  );
};

export default BookArticle;
