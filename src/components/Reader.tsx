import { useEffect } from "react";
import type { SettingsType } from "../App";

type ReaderProps = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  text: string[];
  setEnded: React.Dispatch<React.SetStateAction<boolean>>;
  running: boolean;
  settings: SettingsType;
};

function Reader({ index, setIndex, text, setEnded, running, settings }: ReaderProps) {
  const center = Math.min(Math.floor(text[index].length / 2), 2);

  useEffect(() => {
    if (running) {
      if (index === text.length - 1) {
        setEnded(true);
        return;
      }
      const word = text[index];
      const lastLetter = word[word.length - 1];
      const timeout = lastLetter === "." || lastLetter === "," ? 170000 / settings.speed : 60000 / settings.speed;
      const readerTimeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, timeout);
      return () => {
        clearTimeout(readerTimeout);
      };
    }
  }, [index, setIndex, text, settings.speed, setEnded, running]);

  return (
    <div
      className={`w-full h-30 md:h-50 border-3 border-box-color rounded-lg flex items-center justify-center ${settings.size === "s" ? "text-2xl" : settings.size === "m" ? "text-4xl" : "text-5xl"} font-bold text-secondary-text relative`}
    >
      {settings.focus && (
        <>
          <div className="absolute left-[50%] -translate-x-[50%] w-0.5 bg-box-color h-8 md:h-17 top-0" />
          <div className="absolute left-[50%] -translate-x-[50%] w-0.5 bg-box-color h-8 md:h-17 bottom-0" />
        </>
      )}
      <div className={`${settings.focus ? "flex-1" : ""} text-right`}>{text[index].slice(0, center)}</div>
      <div className={settings.focus ? "text-accent" : "text-secondary-text"}>{text[index][center]}</div>
      <div className={`${settings.focus ? "flex-1 w-20" : ""} text-left`}>{text[index].slice(center + 1)}</div>
    </div>
  );
}

export default Reader;
