import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { createTheme } from "@uiw/codemirror-themes";
import "./Outline.css";

// Create a One Dark theme
const oneDarkTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#282c34",
    foreground: "#abb2bf",
    caret: "#528bff",
    selection: "#3E4451",
    gutterBackground: "#282c34",
    gutterForeground: "#6b737f",
  },
});

function Article() {
  const [form, setForm] = useState({
    title: "",
    abstract: "",
    article: "",
    tags: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert("Congratulations! Your post has been added successfully.");
  };

  return (
    <div className="article-container">
      <div className="form-group">
        <label htmlFor="title">Header of your new article</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Be Creative & enter a descriptive heading for your new post!"
        />
      </div>

      <div className="form-group">
        <label htmlFor="abstract">Write a Brief Overview for your new post!</label>
        <textarea
          id="abstract"
          name="abstract"
          value={form.abstract}
          onChange={handleChange}
          className="textarea-field"
          placeholder="Write a short one-paragraph overview"
        />
      </div>

      <div className="form-group">
        <label htmlFor="article">Provide Full Text (Markdown supported)</label>
        <CodeMirror
          value={form.article}
          height="300px" // increased height
          extensions={[markdown()]}
          theme={oneDarkTheme} // applied One Dark theme
          onChange={(value) =>
            setForm((prev) => ({ ...prev, article: value }))
          }
        />
      </div>

      <div className="markdown-preview">
        <h3>Live Preview</h3>
        <ReactMarkdown>{form.article}</ReactMarkdown>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Enter a few Topics below</label>
        <input
          id="tags"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="input-field"
          placeholder="Add relevant topics for your post, e.g., React, Web Design"
        />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Add Post
      </button>
    </div>
  );
}

export default Article;
