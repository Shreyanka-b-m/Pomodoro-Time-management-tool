import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './TimerContainer.css';

const ProgressCard = ({ progress }: { progress: number }) => {
  const { isRunning } = useSelector((state: RootState) => state.timeSwitch);
  const { color } = useSelector((state: RootState) => state.category);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
      progressRef.current.style.backgroundColor = color;
      progressRef.current.style.opacity = isRunning ? '1' : '0.4';
    }
  }, [progress, color, isRunning]);

  return (
    <div className="progress-container">
      <div className="progress-bar" ref={progressRef}></div>
    </div>
  );
};

export default ProgressCard;