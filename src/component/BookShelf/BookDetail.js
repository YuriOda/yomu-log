import { useSelector, useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/data-slice";
import { useParams, useNavigate, useNavigation } from "react-router-dom";
import useHttp from "../../store/useHttp-hook";
import BookData from "./BookData";
import BookArticle from "./BookArticle";

const BookDetail = () => {
  window.scrollTo(0, 0);
  const { sendRequest, isLoading, httpError } = useHttp();
  const navigation = useNavigation();
  const ready = navigation.state === "idle";
  console.log(navigation.state);

  //router
  const navigate = useNavigate();
  const paramsId = useParams().bookId.toLocaleString();

  //redux
  const dispatch = useDispatch();
  const savedBooks = useSelector((state) => state.data.savedBooks);
  const articles = useSelector((state) => state.data.articles);

  //book
  const bookIndex = savedBooks.findIndex((book) => book.bookId === paramsId);
  const book = savedBooks[bookIndex];

  //articles
  const selectedArticles = articles.filter(
    (article) => article.bookId === paramsId
  );
  const articleList = selectedArticles.map((article) => {
    const editArticleHandler = () => {
      navigate(`/book-shelf/${article.articleId}/edit`);
    };

    //delete
    const deleteArticleHandler = () => {
      const confirm = window.confirm("Are you sure to delete this article?");
      if (!confirm) {
        return;
      }

      const filteredArticles = articles.filter(
        (item) => item.articleId !== article.articleId
      );

      sendRequest(
        { genre: "ARTICLES", method: "PUT", body: filteredArticles },
        () => {}
      );
      dispatch(dataSliceActions.replaceArticles(filteredArticles || []));
    };

    return (
      <BookArticle
        key={article.articleId}
        id={article.articleId}
        date={article.date}
        article={article.article}
        onEdit={editArticleHandler}
        onDelete={deleteArticleHandler}
      />
    );
  });

  const postArticleHandler = () => {
    navigate(`/new/${book.bookId}/post`);
  };

  let message;
  if (isLoading) {
    message = "Reloading ...";
  }

  if (httpError) {
    message = "Something went wrong!";
  }

  return (
    <>
      {ready && (
        <div className="main-wrapper">
          <section id="book-detail">
            <BookData book={book} />

            <button className="book-button" onClick={postArticleHandler}>
              New Post
            </button>

            <div>
              <p>{message}</p>
            </div>

            <div className="book-articles">
              <ul>{articleList}</ul>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default BookDetail;
