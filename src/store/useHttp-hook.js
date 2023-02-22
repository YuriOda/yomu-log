import { useCallback, useState } from "react";
import { savedBooksUrl, articlesUrl, googleBooksUrl } from "./firebase-url";

const useHttp = () => {
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const sendRequest = useCallback(async (reqConfig, applyData) => {
    setHttpError(null);
    setIsLoading(true);

    let url;
    if (reqConfig.genre === "BOOKS") {
      url = savedBooksUrl;
    }
    if (reqConfig.genre === "ARTICLES") {
      url = articlesUrl;
    }
    if (reqConfig.genre === "API") {
      url = `${googleBooksUrl}${reqConfig.url}&maxResults=30`;
    }

    try {
      const response = await fetch(url, {
        method: reqConfig.method ? reqConfig.method : "GET",
        headers: reqConfig.headers ? reqConfig.headers : {},
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Requests failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (error) {
      setHttpError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    httpError,
    isLoading,
  };
};

export default useHttp;
