import React, { useState } from "react";
import Outline from "./Outline";
import "./Outline.css";
import { oneDark } from "@uiw/codemirror-themes";
function NewPost() {
  return (
    <div className="new-post-wrapper">
      <Outline />
    </div>
  );
}

export default NewPost;
