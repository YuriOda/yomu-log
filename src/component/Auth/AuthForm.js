import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
} from "react-router-dom";

const AuthForm = () => {
  const navigation = useNavigation();
  const [searchParam] = useSearchParams();
  const isSignup = searchParam.get("mode") === "signup";
  const isSubmitting = navigation.state === "submitting";

  //ERROR
  const data = useActionData();

  return (
    <>
      <section className="auth-section">
        <div className="auth-div">
          <h1 className="auth-title">
            {isSignup ? "Create a new Account" : "Login"}
          </h1>
          <Form method="post" className="auth-form">
            <p>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </p>

            <p>
              <label htmlFor="image">Password</label>
              <input id="password" type="password" name="password" required />
            </p>

            {data && (
              <>
                <p className="auth-error">Something went wrong!</p>
                <p className="auth-error">
                  Please check your email/password or try again later
                </p>
              </>
            )}

            <div>
              <button className="auth-save-button">
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>

            <div className="auth-toggle-div">
              <Link to={`?mode=${isSignup ? "login" : "signup"}`}>
                {isSignup ? "already have one?" : "create a new accout"}
              </Link>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default AuthForm;
