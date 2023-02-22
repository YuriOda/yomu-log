import { json, redirect } from "react-router-dom";
import Header from "../component/Header/Header";
import AuthForm from "../component/Auth/AuthForm";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthPage = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <AuthForm />
    </div>
  );
};

export default AuthPage;

export const authAction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const auth = getAuth();
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");

  const date = new Date();
  const loginTime = date.getTime();
  localStorage.setItem("loginTime", loginTime);
  console.log(loginTime);

  if (mode === "login") {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const data = await userCredential.user;
      const token = data.accessToken;
      localStorage.setItem("token", token);
      const expiration = Number(data.metadata.lastLoginAt) + 1 * 60 * 60 * 1000;
      localStorage.setItem("expiration", expiration);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  }

  if (mode === "signup") {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const data = await userCredential.user;
      const token = await data.accessToken;
      localStorage.setItem("token", token);
      const expiration =
        Number(await data.metadata.lastLoginAt) + 1 * 60 * 60 * 1000;
      localStorage.setItem("expiration", expiration);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  }

  return redirect("/");
};
