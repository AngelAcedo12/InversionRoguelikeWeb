import { useEffect, useState } from "react";

const useTime = () => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(time);
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};

export { useTime };
