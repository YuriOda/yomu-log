const Book = (props) => {
  return (
    <>
      <section id="bookcover-section">
        <div className="book" onClick={props.onClick}>
          <img src={props.cover} alt="Book Cover" id={props.bookId} />
        </div>
        <div className="book-textbox">
          <p>{props.title}</p>
        </div>
      </section>
    </>
  );
};

export default Book;
