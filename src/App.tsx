import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCaretLeft, FaCaretRight, FaPause, FaPlay, FaStop } from "react-icons/fa";
import { SiTarget } from "react-icons/si";
import Option from "./components/Option";
import Button from "./components/Button";
import Reader from "./components/Reader";

function App() {
  const [speed, setSpeed] = useState<number>(JSON.parse(localStorage.getItem("speadr-speed")!) || 400);
  const [text, setText] = useState<string>("");
  const [reading, setReading] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [zen, setZen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const processedText = useMemo<string[]>(
    () =>
      text
        .trim()
        .replaceAll("\n", " ")
        .split(" ")
        .filter((word) => word.length > 0),
    [text],
  );
  const buttonRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<number>(index);

  useEffect(() => {
    const pressListener = (e: KeyboardEvent) => {
      if ((e.key === " " && reading) || (e.key === "\n" && !reading && e.ctrlKey)) {
        (buttonRef.current?.children[0] as HTMLButtonElement).click();
      }
    };
    const downListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIndex(Math.max(0, indexRef.current - 10));
      } else if (e.key === "ArrowRight") {
        setIndex(Math.min(processedText.length - 1, indexRef.current + 10));
      }
    };
    document.addEventListener("keydown", downListener);
    document.addEventListener("keypress", pressListener);
    return () => {
      document.removeEventListener("keydown", downListener);
      document.removeEventListener("keypress", pressListener);
    };
  }, [reading, processedText]);

  useEffect(() => {
    localStorage.setItem("speadr-speed", JSON.stringify(speed));
  }, [speed]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (ended) {
      setZen(false);
    }
  }, [ended]);

  function handleBtn() {
    if (!reading && text.length > 0) {
      setReading(true);
      setRunning(true);
      setIndex(0);
    } else if (ended) {
      setReading(false);
      setEnded(false);
      setRunning(false);
    } else {
      setRunning(!running);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="flex flex-col w-120 h-screen mx-auto items-center py-20 gap-y-10"
    >
      <div
        className={`${zen && reading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-all! flex flex-col items-center gap-y-5`}
      >
        <h2 className="text-white text-5xl font-bold">Speadr</h2>
        <p className="text-zinc-400">Your All-in-One Reading Tool</p>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className={`${zen && reading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-all! flex gap-x-5`}>
          <Option selected={zen} setSelected={setZen}>
            <SiTarget size={15} />
            Zen mode
          </Option>
          <div className=" text-zinc-400">
            <input
              type="text"
              placeholder="Speed"
              className="rounded-lg w-20 bg-zinc-900 h-full text-zinc-200 px-2 py-1 outline-none resize-none text-lg"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />{" "}
            WPM
          </div>
        </div>
        {reading ? (
          <Reader index={index} setIndex={setIndex} text={processedText} speed={speed} setEnded={setEnded} running={running} />
        ) : (
          <textarea
            className="rounded-lg bg-zinc-900 w-full h-50 text-zinc-200 px-5 py-3 outline-none resize-none text-lg"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        )}
      </div>
      <div
        className={`${zen && reading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-all! flex w-full justify-center gap-x-5`}
      >
        <div className="flex-1 text-zinc-400 text-sm items-center flex">{reading && "Restart coming soon"}</div>
        <div ref={buttonRef} title={!reading ? "Ctrl + Enter" : "Space"} className="flex-1">
          <Button onclick={handleBtn} primary>
            {reading && !ended && running && (
              <>
                <FaPause size={15} /> Pause
              </>
            )}
            {!reading && !ended && (
              <>
                <FaPlay size={15} /> Start
              </>
            )}
            {reading && !running && (
              <>
                <FaPlay size={15} /> Resume
              </>
            )}
            {ended && (
              <>
                <FaStop size={15} /> Exit
              </>
            )}
          </Button>
        </div>
        <div className="flex-1 flex justify-end gap-x-2">
          {reading && (
            <>
              <Button onclick={() => setIndex(Math.max(0, index - 10))} title="Go back 10 words (Left arrow)">
                <FaCaretLeft size={20} />
              </Button>
              <Button
                onclick={() => setIndex(Math.min(processedText.length - 1, index + 10))}
                title="Skip forward 10 words (Right arrow)"
              >
                <FaCaretRight size={20} />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default App;
