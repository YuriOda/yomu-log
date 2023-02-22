import Header from "../component/Header/Header";
import BookShelf from "../component/BookShelf/BookShelf";
import RecentPosts from "../component/RecentPosts/RecentPosts";
import LogoutButton from "../component/LogoutButton";

const Main = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <main>
          <BookShelf />
          <RecentPosts />
          <LogoutButton />
        </main>
      </div>
    </>
  );
};

export default Main;
