import { useEffect } from "react";

const KeyboardListener = ({ keyboard = "k", onTrigger }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === keyboard.toLowerCase()) {
        e.preventDefault();
        if (onTrigger) onTrigger(); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboard, onTrigger]);

  return null; 
};

export default KeyboardListener;
