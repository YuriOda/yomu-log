import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/data-slice";
import { useParams, useNavigate } from "react-router-dom";

import HeaderCancel from "../Header/HeaderCancel";
import useHttp from "../../store/useHttp-hook";
import ArticleForm from "../ArticleForm";

const EditArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const articleRef = useRef();
  const articleId = useParams().articleId;
  const { sendRequest } = useHttp();

  const articles = useSelector((state) => state.data.articles);
  const selectedArticle = articles.find(
    (article) => article.articleId === articleId
  );

  const submitChangeHandler = () => {
    const enteredArticle = articleRef.current.value;

    const newArticle = {
      bookId: selectedArticle.bookId,
      articleId: selectedArticle.articleId,
      date: selectedArticle.date,
      article: enteredArticle,
    };

    const index = articles.findIndex(
      (savedArticle) => savedArticle.articleId === articleId
    );
    const newArticles = Array.from(articles);
    newArticles.splice(index, 1, newArticle);

    sendRequest(
      { genre: "ARTICLES", method: "PUT", body: newArticles },
      () => {}
    );
    dispatch(dataSliceActions.replaceArticles(newArticles || []));

    navigate(`/book-shelf/${selectedArticle.bookId}`);
  };

  return (
    <>
      <HeaderCancel to={`/book-shelf/${selectedArticle.bookId}`} />
      <section className="edit-section">
        <ArticleForm
          onSubmit={submitChangeHandler}
          defaultValue={selectedArticle.article}
          ref={articleRef}
        />
      </section>
    </>
  );
};

export default EditArticle;
