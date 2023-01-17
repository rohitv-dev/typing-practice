import { useEffect, useRef, useState } from "react";

const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (isRunning) startInterval();
    else stopInterval();

    return () => stopInterval();
  }, [isRunning]);

  const incrementElapsedTime = () => {
    setElapsedTime((time) => time + 1);
  };

  const startInterval = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(incrementElapsedTime, 1000);
    }
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return {
    isRunning,
    elapsedTime,
    start,
    stop,
    reset,
  };
};

export default useStopwatch;
