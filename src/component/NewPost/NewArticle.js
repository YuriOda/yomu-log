import { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/data-slice";

import useHttp from "../../store/useHttp-hook";
import HeaderCancel from "../Header/HeaderCancel";
import Spinner from "../../icon-logo/Spinner";
import ArticleForm from "../ArticleForm";

const NewArticle = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const articleRef = useRef();
  const { sendRequest, httpError, isLoading } = useHttp();

  //redux
  const dispatch = useDispatch();
  const savedBooks = useSelector((state) => state.data.savedBooks);
  const newBook = useSelector((state) => state.data.newBook);

  //new or add
  const paramId = useParams().bookId.toLocaleString();
  const newBookIndex = savedBooks.findIndex((book) => book.bookId === paramId);

  let selectedBook;
  if (newBookIndex === -1) {
    selectedBook = newBook;
  } else {
    selectedBook = savedBooks[newBookIndex];
  }

  //submit
  const submitArticleHandler = (e) => {
    e.preventDefault();

    //ARTICLE DATA
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = ("000" + (newDate.getMonth() + 1)).slice(-2);
    const day = ("000" + newDate.getDate()).slice(-2);
    const date = { year, month, day };
    const timestamp = newDate.getTime().toString();

    const article = {
      bookId: selectedBook.bookId,
      articleId: `${selectedBook.bookId}_${timestamp}`,
      date,
      article: articleRef.current.value,
    };

    dispatch(dataSliceActions.addToArticles(article));
    sendRequest({ genre: "ARTICLES", method: "POST", body: article }, () => {});

    const existingBook = savedBooks.find((book) => book.bookId === paramId);

    if (!existingBook) {
      sendRequest({ genre: "BOOKS", method: "POST", body: newBook }, () => {});
      dispatch(dataSliceActions.addToSavedBooks(newBook));
    }

    navigate(`/book-shelf/${selectedBook.bookId}`);
  };

  const errorMessage = (
    <div className="article-message-div">
      <p className="article-message">Something went wrong 🥲</p>
      <Link to="/">
        <button className="error-button">Go Back</button>
      </Link>
    </div>
  );

  const isSending = (
    <div className="article-message-div">
      <p className="article-message">Saving ...</p>
      <Spinner />
    </div>
  );

  return (
    <div className="main-wrapper">
      <HeaderCancel to="/book-shelf" />
      <section className="article-section">
        {isLoading && isSending}
        {!isLoading && httpError && errorMessage}
        {!isLoading && !httpError && (
          <ArticleForm
            onSubmit={submitArticleHandler}
            placeholder="write a new article here ..."
            defaultValue=""
            ref={articleRef}
          />
        )}
      </section>
    </div>
  );
};

export default NewArticle;
