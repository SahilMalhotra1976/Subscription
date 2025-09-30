import React, { useState } from 'react';
import './Outline.css';
import Questions from './Questions';
import Article from './Article';

function Outline() {
  const [isQuestion, setIsQuestion] = useState(null);

  return (
    <div className="outline-container">
      <div className="post-type-selector">
        <span>Select Post Type:</span>
        <label className="radio-option">
          <input
            type="radio"
            name="postType"
            value="Questions"
            onClick={() => setIsQuestion(true)}
          />
          Questions
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="postType"
            value="Articles"
            onClick={() => setIsQuestion(false)}
          />
          Articles
        </label>
      </div>

      <div className="head">
        <div className="ques">What do you want to ask or share</div>
      </div>

      {isQuestion === true && <Questions />}
      {isQuestion === false && <Article />}
    </div>
  );
}

export default Outline;
