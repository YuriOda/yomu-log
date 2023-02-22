import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Book from "./Book";

const BookShelf = () => {
  const navigate = useNavigate();
  const savedBooks = useSelector((state) => state.data.savedBooks);

  const BookList = savedBooks.map((book) => {
    const viewBookDetailHandler = () => {
      navigate(`/book-shelf/${book.bookId}`);
    };

    return (
      <Book
        key={book.bookId}
        id={book.bookId}
        cover={book.cover}
        title={book.title}
        onClick={viewBookDetailHandler}
      />
    );
  });

  return (
    <section id="book-shelf">
      <div className="shelf-div">{BookList}</div>
    </section>
  );
};

export default BookShelf;
