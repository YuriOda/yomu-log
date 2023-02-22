import { useRouteError } from "react-router-dom";
import MainNavigation from "../component/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Error";
  let message = "Something went wrong 🥲";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "No Page Found!";
    message = "Please try a different page 🥲";
  }

  return (
    <>
      <main className="error-page">
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
      <MainNavigation />
    </>
  );
};

export default ErrorPage;
