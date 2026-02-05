import { useState, useEffect } from "react";

type ReaderProps = {
  text: string[];
  speed: number;
  setEnded: React.Dispatch<React.SetStateAction<boolean>>;
};

function Reader({ text, speed, setEnded }: ReaderProps) {
  const [index, setIndex] = useState<number>(0);
  const [center, setCenter] = useState<number>(0);

  useEffect(() => {
    if (index === text.length - 1) {
      setEnded(true);
      return;
    }
    const readerTimeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 60000 / speed);
    setCenter(Math.min(Math.floor(text[index].length / 2), 2));
    console.log(index);

    return () => {
      clearTimeout(readerTimeout);
    };
  }, [index, text, speed, setEnded]);

  return (
    <div className="w-full h-50 border-3 border-zinc-900 rounded-lg flex items-center justify-center text-4xl font-bold text-white relative">
      <div className="absolute left-[50%] -translate-x-[50%] w-0.5 bg-zinc-900 h-17 top-0" />
      <div className="absolute left-[50%] -translate-x-[50%] w-0.5 bg-zinc-900 h-17 bottom-0" />
      <div className="flex-1 text-right">{text[index].slice(0, center)}</div>
      <div className="text-red-500">{text[index][center]}</div>
      <div className="flex-1 w-50 text-left">{text[index].slice(center + 1)}</div>
    </div>
  );
}

export default Reader;
