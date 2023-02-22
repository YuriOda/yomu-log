import { useMediaQuery } from "react-responsive";

const RecentPostsItem = (props) => {
  const isSmall = useMediaQuery({
    query: "(max-width: 400px)",
  });

  return (
    <li className="recent-book">
      <div>
        <span className="recent-date">{props.date}</span>
        <span className="recent-title">{props.title}</span>
      </div>

      {!isSmall && (
        <button onClick={props.onClick} className="view-button">
          View
        </button>
      )}
    </li>
  );
};

export default RecentPostsItem;
