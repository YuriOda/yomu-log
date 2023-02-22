import { Form } from "react-router-dom";

const LogoutButton = () => {
  return (
    <section id="logout-section">
      <Form method="post" action="/logout">
        <button className="logout-button">Logout</button>
      </Form>
    </section>
  );
};

export default LogoutButton;
