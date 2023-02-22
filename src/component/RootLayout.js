import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  json,
  useRouteLoaderData,
  redirect,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "./MainNavigation";
import AuthPage from "../Pages/AuthPage";
import { savedBooksUrl, articlesUrl } from "../store/firebase-url";
import { dataSliceActions } from "../store/data-slice";
import { getAuthToken, getTokenDuration } from "../store/auth";

const RootLayout = () => {
  //MQ
  const isLarge = useMediaQuery({
    query: "(min-width: 600px)",
  });

  //
  const submit = useSubmit();
  const token = useRouteLoaderData("main").token;

  const dispatch = useDispatch();
  const savedBooks = useRouteLoaderData("main").savedBooks;
  const articles = useRouteLoaderData("main").articles;

  useEffect(() => {
    console.log("useEffect on RootLayout");
    dispatch(dataSliceActions.replaceSavedBooks(savedBooks || []));
    dispatch(dataSliceActions.replaceArticles(articles || []));
  }, [dispatch, articles, savedBooks]);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }

    const expiresIn = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, expiresIn);
  }, [token, submit]);

  return (
    <>
      {!token && <AuthPage />}
      {token && !isLarge && (
        <>
          <Outlet />
          <MainNavigation />
        </>
      )}
      {token && isLarge && (
        <>
          <MainNavigation />
          <Outlet />
        </>
      )}
    </>
  );
};

export const mainLoader = async () => {
  console.log("mainLoader");
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  const bookRes = await fetch(savedBooksUrl);
  const artRes = await fetch(articlesUrl);

  if (!bookRes.ok && !artRes.ok) {
    throw json({ message: "Failed to fetch data!" }, { status: 500 });
  }

  if (!bookRes.ok) {
    throw json({ message: "Failed to fetch books data!" }, { status: 500 });
  }

  if (!artRes.ok) {
    throw json({ message: "Failed to fetch articles data!" }, { status: 500 });
  }

  const savedBooks = [];
  const bookData = await bookRes.json();
  for (const property in bookData) {
    savedBooks.push({
      author: bookData[property].author,
      bookId: bookData[property].bookId,
      cover: bookData[property].cover,
      date: bookData[property].date,
      title: bookData[property].title,
    });
  }

  const articles = [];
  const articleData = await artRes.json();
  for (const property in articleData) {
    articles.push({
      bookId: articleData[property].bookId,
      articleId: articleData[property].articleId,
      date: articleData[property].date,
      article: articleData[property].article,
    });
  }

  return { savedBooks, articles, token };
};

export default RootLayout;
