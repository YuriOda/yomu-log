import BookShelf from "../component/BookShelf/BookShelf";

const BookMain = () => {
  return (
    <>
      <div className="main-wrapper">
        <section id="book-main-section">
          <h3 className="bookshelf-title"> Bookshelf</h3>
          <BookShelf />
        </section>
      </div>
    </>
  );
};

export default BookMain;
