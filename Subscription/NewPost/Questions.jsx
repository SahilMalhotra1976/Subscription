import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { createTheme } from "@uiw/codemirror-themes";
import "./Outline.css";

// Create a One Dark theme for the editor
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

function Questions() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert("Your question has been submitted successfully!");
    // Optional: Add API call to save question
  };

  return (
    <div className="article-container">
      <div className="form-group">
        <label htmlFor="title">Question Heading</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Frame your question clearly, e.g., How do I…?"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Problem Details (Markdown supported)</label>
        {/* CodeMirror editor for description */}
        <CodeMirror
          value={form.description}
          height="300px"
          extensions={[markdown()]}
          theme={oneDarkTheme}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, description: value }))
          }
        />
      </div>

      <div className="markdown-preview">
        <h3>Live Preview</h3>
        <ReactMarkdown>{form.description}</ReactMarkdown>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Keywords</label>
        <input
          id="tags"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter up to 3 keywords, e.g., React, CSS"
        />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Question
      </button>
    </div>
  );
}

export default Questions;
