import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { start, pause, toggle } from '../../redux/slices/timeSwitchSlice';
import { increment, reset, setCount } from '../../redux/slices/countSlice';
import { setPomodoro, setShortBreak, setLongBreak } from '../../redux/slices/categorySlice';
import { setPomodoroTime, setShortBreakTime, setLongBreakTime } from '../../redux/slices/timeSlice';
import './TimerContainer.css';
import ProgressCard from './ProgressCard';

const Timer = () => {
  const dispatch = useDispatch();
  const { isRunning } = useSelector((state: RootState) => state.timeSwitch);
  const { name, color } = useSelector((state: RootState) => state.category);
  const { pomodoro, shortBreak, longBreak } = useSelector((state: RootState) => state.time);
  const count = useSelector((state: RootState) => state.count.value);
  
  const [timeLeft, setTimeLeft] = useState(pomodoro);
  const [isEditing, setIsEditing] = useState(false);
  const [editTime, setEditTime] = useState(pomodoro);

  // Initialize timer on first load
  useEffect(() => {
    dispatch(setPomodoro());
    setTimeLeft(pomodoro);
  }, [dispatch, pomodoro]);

  const calculateProgress = () => {
    const totalTime = name === 'Pomodoro' ? pomodoro : 
                     name === 'Short Break' ? shortBreak : longBreak;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Update timeLeft when session changes
  useEffect(() => {
    setTimeLeft(name === 'Pomodoro' ? pomodoro : 
               name === 'Short Break' ? shortBreak : longBreak);
  }, [name, pomodoro, shortBreak, longBreak]);

  // Timer countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
    
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const playNotificationSound = () => {
    try {
      const audio = new Audio("notification.mp3");
      audio.play().catch(e => console.error("Audio play failed:", e));
    } catch (e) {
      console.error("Sound error:", e);
    }
  };

  const getNextSessionType = (currentCount: number) => {
    const nextCount = currentCount + 1;
    if (nextCount % 8 === 0) return 'Long Break';
    if (nextCount % 2 === 0) return 'Short Break';
    return 'Pomodoro';
  };

  const switchToNextSession = () => {
    const nextType = getNextSessionType(count);
    switch (nextType) {
      case 'Long Break':
        dispatch(setLongBreak());
        setTimeLeft(longBreak);
        break;
      case 'Short Break':
        dispatch(setShortBreak());
        setTimeLeft(shortBreak);
        break;
      default:
        dispatch(setPomodoro());
        setTimeLeft(pomodoro);
    }
    dispatch(increment());
  };

  const handleTimerComplete = () => {
    playNotificationSound();
    dispatch(pause());
    switchToNextSession();
    dispatch(start());
  };

  const handleSkip = () => {
    switchToNextSession();
  };

  const handleStartPause = () => {
    dispatch(toggle());
  };

  const handleReset = () => {
    dispatch(pause());
    switch (name) {
      case 'Pomodoro':
        setTimeLeft(pomodoro);
        break;
      case 'Short Break':
        setTimeLeft(shortBreak);
        break;
      case 'Long Break':
        setTimeLeft(longBreak);
        break;
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTime(timeLeft);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    switch (name) {
      case 'Pomodoro':
        dispatch(setPomodoroTime(editTime));
        break;
      case 'Short Break':
        dispatch(setShortBreakTime(editTime));
        break;
      case 'Long Break':
        dispatch(setLongBreakTime(editTime));
        break;
    }
    setTimeLeft(editTime);
  };

  const handleCancelEdit = () => {
  setIsEditing(false);
  setEditTime(name === 'Pomodoro' ? pomodoro : 
             name === 'Short Break' ? shortBreak : longBreak);
};

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <ProgressCard progress={calculateProgress()} />
      <div className="timer-container">
        <div className="timer-display" style={{ color }}>
          {formatTime(timeLeft)}
        </div>
        <div className="timer-controls">
          {isEditing ? (
            <>
              <input
                type="number"
                value={editTime / 60}
                onChange={(e) => setEditTime(parseInt(e.target.value) * 60 || 0)}
                min="1"
                max="60"
              />
              <button className="save" onClick={handleSaveEdit}>Save</button>
              <button className="cancel" onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <button className="edit" onClick={handleEdit}>Edit Time</button>
              <button className="start" onClick={handleStartPause}>
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button className="reset" onClick={handleReset}>Reset</button>
              <button className="skip" onClick={handleSkip}>Skip</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Timer;