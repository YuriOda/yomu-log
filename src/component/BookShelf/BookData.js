const BookData = (props) => {
  return (
    <div className="book-info">
      <div className="book-cover">
        <img src={props.book.cover} alt="Book Cover" />
      </div>
      <div className="book-description">
        <h4 className="book-title">{props.book.title}</h4>
        <p className="book-author">{props.book.author}</p>
      </div>
    </div>
  );
};

export default BookData;
