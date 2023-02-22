import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecentPostsItem from "./RecentPostsItem";

const RecentPosts = () => {
  const [hasArticle, setHasArticle] = useState(null);
  const navigate = useNavigate();
  const savedBooks = useSelector((state) => state.data.savedBooks);
  const articles = useSelector((state) => state.data.articles);

  useEffect(() => {
    if (articles && articles.length !== 0) {
      setHasArticle(true);
    }
  }, [articles]);

  let slicedArticles;
  if (articles.length < 5 && articles.length !== 0) {
    slicedArticles = articles.slice().reverse();
  } else {
    slicedArticles = articles.slice(-5).reverse();
  }

  const recentPosts = slicedArticles.map((article) => {
    const book = savedBooks.find((book) => article.bookId === book.bookId);
    const { title, bookId } = book;
    const { articleId, date } = article;
    const { month, day } = date;
    const articleDate = `${month}/${day}`;

    const viewDetailHandler = () => {
      navigate(`/book-shelf/${bookId}`);
    };

    return (
      <RecentPostsItem
        key={articleId}
        title={title}
        date={articleDate}
        article={article}
        onClick={viewDetailHandler}
      />
    );
  });

  return (
    <section id="recent-posts">
      <div className="posts">
        <h3>Recent Posts</h3>
        <hr />

        {!hasArticle && <p>No Posts Yet!</p>}
        {hasArticle && <ul className="recent-ul">{recentPosts}</ul>}
      </div>
    </section>
  );
};

export default RecentPosts;
