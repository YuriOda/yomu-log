import React from "react";
import ButtonSend from "../icon-logo/ButtonSend";

const ArticleForm = React.forwardRef((props, ref) => {
  return (
    <form onSubmit={props.onSubmit} className="form-article">
      <ButtonSend className="button-send-small" />
      <textarea
        type="text"
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        ref={ref}
        className="input-article"
        autoComplete="off"
        required
        autoFocus
      />
      <div className="button-send-div">
        <ButtonSend className="button-send-large" />
      </div>
    </form>
  );
});

export default ArticleForm;
