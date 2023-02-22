import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/data-slice";
import { useNavigate } from "react-router-dom";

import useHttp from "../../store/useHttp-hook";
import Spinner from "../../icon-logo/Spinner";

//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NoPicture from "../../assets/nopicture.jpg";

const NewTitle = () => {
  //redux
  const dispatch = useDispatch();

  //router
  const navigate = useNavigate();

  //ref, state
  const titleRef = useRef();
  const [selectBook, setSelectedBook] = useState(null);
  const [results, setResults] = useState(null);

  //custom hook
  const { sendRequest, isLoading, httpError } = useHttp();
  const sortBooks = (data) => {
    // const slicedData = data.items.slice(0, 20);
    const resultBooks = data.items.map((book) => {
      const bookId = book.id;
      const { title, authors, publishedDate } = book.volumeInfo;

      const author = authors ? authors[0] : "NoInfo";
      const date = publishedDate ? publishedDate : "NoInfo";
      const cover = book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : NoPicture;

      return {
        bookId,
        author,
        title,
        date,
        cover,
      };
    });
    setResults(resultBooks);
  };

  //handler
  const submitTitleFormHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    sendRequest({ genre: "API", url: title }, sortBooks);
  };

  //list
  let list;
  if (results) {
    list = results.map((book) => {
      const selectBookHandler = () => {
        dispatch(dataSliceActions.selectBook(book));
        setSelectedBook(true);

        navigate(`/new/${book.bookId}/post`);
      };

      return (
        <div key={book.bookId} onClick={selectBookHandler} className="result">
          <p className="result-title">{book.title}</p>
          <p className="result-author">{book.author}</p>
          <img className="result-img" src={book.cover} alt="Cover" />
        </div>
      );
    });
  }

  return (
    <section className="title-section">
      {!selectBook && (
        <form className="title-form" onSubmit={submitTitleFormHandler}>
          <input
            type="text"
            id="form-title"
            ref={titleRef}
            placeholder="title, author ..."
            className="title-input"
            autoComplete="off"
            required
          />
          <button className="title-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      )}

      {!selectBook && results && <div className="results">{list}</div>}

      {!selectBook && httpError && (
        <p className="comment">Something went wrong!</p>
      )}

      {!selectBook && isLoading && (
        <>
          <p className="comment">finding the book...</p>
          <Spinner />
        </>
      )}
    </section>
  );
};

export default NewTitle;
