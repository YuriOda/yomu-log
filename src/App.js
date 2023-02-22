//router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components
import RootLayout from "./component/RootLayout";
import Main from "./Pages/Main";
import BookDetail from "./component/BookShelf/BookDetail";
import NewArticle from "./component/NewPost/NewArticle";
import EditArticle from "./component/NewPost/EditArticle";

//page
import BookMain from "./Pages/BookMain";
import ErrorPage from "./Pages/ErrorPage";
import AuthPage from "./Pages/AuthPage";
import FindBook from "./Pages/FindBook";

//loader, action
import { mainLoader } from "./component/RootLayout";
import { authAction } from "./Pages/AuthPage";
import { logoutAction } from "./Pages/Logout";

//style
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "main",
    loader: mainLoader,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "new",
        children: [
          { index: true, element: <FindBook /> },
          {
            path: ":bookId/post",
            element: <NewArticle />,
          },
        ],
      },
      {
        path: "book-shelf",
        element: <BookMain />,
      },
      {
        path: "book-shelf/:bookId",
        element: <BookDetail />,
      },
      {
        path: "book-shelf/:articleId/edit",
        element: <EditArticle />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    id: "auth",
    action: authAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
