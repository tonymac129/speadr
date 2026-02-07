import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCaretLeft, FaCaretRight, FaFileImport, FaGithub, FaInfoCircle, FaPause, FaPlay, FaStop } from "react-icons/fa";
import { FaGear, FaRotateRight } from "react-icons/fa6";
import { SiTarget } from "react-icons/si";
import Option from "./components/Option";
import Button from "./components/Button";
import Reader from "./components/Reader";
import Btn from "./components/Btn";
import Modal from "./components/Modal";

const defaultSettings: SettingsType = {
  size: "m",
  theme: "midnight",
  focus: true,
  speed: 350,
};

export type SettingsType = {
  size: string;
  theme: string;
  focus: boolean;
  speed: number;
};

function App() {
  const [settings, setSettings] = useState<SettingsType>(JSON.parse(localStorage.getItem("speadr-settings")!) || defaultSettings);
  const [text, setText] = useState<string>("");
  const [reading, setReading] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [zen, setZen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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

  function handleRestart() {
    setIndex(0);
    setReading(true);
    setRunning(true);
    setEnded(false);
  }

  useEffect(() => {
    const pressListener = (e: KeyboardEvent) => {
      if (e.key === "\n" && !reading && e.ctrlKey) {
        (buttonRef.current?.children[0] as HTMLButtonElement).click();
      } else if (e.key === "r" && reading) {
        handleRestart();
      }
    };
    const downListener = (e: KeyboardEvent) => {
      if (e.key === " " && reading) {
        e.preventDefault();
        (buttonRef.current?.children[0] as HTMLButtonElement).click();
      }
      if (e.key === "ArrowLeft") {
        setIndex(Math.max(0, indexRef.current - 10));
      } else if (e.key === "ArrowRight") {
        setIndex(Math.min(processedText.length - 1, indexRef.current + 10));
      } else if (e.key === "Escape") {
        setZen(false);
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
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (ended) {
      setZen(false);
    }
  }, [ended]);

  useEffect(() => {
    localStorage.setItem("speadr-settings", JSON.stringify(settings));
  }, [settings]);

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

  function handleImport() {
    console.log("import");
  }

  function handleAbout() {
    setText("This is Speadr.");
    handleRestart();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="flex flex-col w-150 h-screen mx-auto items-center py-20 gap-y-5"
    >
      <div
        className={`${zen && reading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-all! flex flex-col items-center gap-y-5 mb-5`}
      >
        <h2 className="text-white text-5xl font-bold">Speadr</h2>
        <p className="text-zinc-400">Your All-in-One Reading Tool</p>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className={`${zen && reading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-all! flex gap-x-3`}>
          <Btn onclick={handleImport} title="Import text file">
            <FaFileImport size={15} /> Import text
          </Btn>
          <Option selected={zen} setSelected={setZen} title="Toggle zen mode">
            <SiTarget size={15} />
            Zen mode
          </Option>
          <Btn onclick={() => setModalOpen(true)} title="Open settings">
            <FaGear size={15} />
            Settings
          </Btn>
          <Btn onclick={() => window.open("https://github.com/tonymac129/speadr", "_blank")} title="View on GitHub">
            <FaGithub size={15} />
          </Btn>
          <Btn onclick={handleAbout} title="About Speadr">
            <FaInfoCircle size={15} />
          </Btn>
        </div>
        {reading ? (
          <Reader
            index={index}
            setIndex={setIndex}
            text={processedText}
            setEnded={setEnded}
            running={running}
            settings={settings}
          />
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
        <div className="flex-1 text-zinc-400 text-sm items-center flex">
          {reading && (
            <Button onclick={handleRestart} title="Restart (R)">
              <FaRotateRight size={20} />
            </Button>
          )}
        </div>
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
      {zen && reading && <div className="absolute bottom-2 text-zinc-600 text-xs">Esc to exit</div>}
      <AnimatePresence>
        {modalOpen && <Modal settings={settings} setSettings={setSettings} close={() => setModalOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
