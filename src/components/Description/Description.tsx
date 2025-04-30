import React from 'react';
import './Description.css';

const Description = () => {
  return (
    <div className="description">
      <h2>How to use:</h2>
      <ul>
        <li>Click Start to begin the timer</li>
        <li>Take a 5-minute <strong>Short Break</strong> after each Pomodoro</li>
        <li>Every 4 Pomodoros, take a 15-minute <strong>Long Break</strong></li>
        <li>Use <strong>Skip</strong> to move to the next phase early</li>
      </ul>
    </div>
  );
};

export default Description;