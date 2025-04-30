import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './SelectTab.css';

const SelectTab = () => {
  const { name, color } = useSelector((state: RootState) => state.category);
  
  return (
    <div className="select-tab">
      <button
        className={`tab-button ${name === 'Pomodoro' ? 'active' : ''}`}
        style={name === 'Pomodoro' ? { backgroundColor: color } : {}}
      >
        Pomodoro
      </button>
      <button
        className={`tab-button ${name === 'Short Break' ? 'active' : ''}`}
        style={name === 'Short Break' ? { backgroundColor: color } : {}}
      >
        Short Break
      </button>
      <button
        className={`tab-button ${name === 'Long Break' ? 'active' : ''}`}
        style={name === 'Long Break' ? { backgroundColor: color } : {}}
      >
        Long Break
      </button>
    </div>
  );
};

export default SelectTab;