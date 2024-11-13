import React, { useEffect, useState } from "react";
import "./css/clickInitGame.css"; // Import the CSS file for styling
import { useGameContext } from "@/services/gameContext";

const ClickInitGame: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { handleStartButtonClick } = useGameContext();
  useEffect(() => {
    let hasLoaded = false;

    const handlePageLoad = () => {
      if (!hasLoaded) {
        setIsInitialized(false);
        hasLoaded = true;
      }
    };

    window.addEventListener("load", handlePageLoad);

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);

  const handleClick = () => {
    setIsInitialized(true);
    if (isInitialized) return;
    handleStartButtonClick();
  };

  if (isInitialized) {
    return null;
  }

  return (
    <div className="click-init-overlay" onClick={handleClick}>
      <div className="click-init-message">Click to Initialize Game</div>
    </div>
  );
};

export default ClickInitGame;
