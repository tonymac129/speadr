import { useState } from "react";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";
import { SiTarget } from "react-icons/si";
import Option from "./components/Option";
import Button from "./components/Button";
import Reader from "./components/Reader";

function App() {
  const [selected, setSelected] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(500);
  const [text, setText] = useState<string>("");
  const [reading, setReading] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="flex flex-col w-120 h-screen mx-auto items-center py-20 gap-y-10"
    >
      <div className="flex flex-col items-center gap-y-5">
        <h2 className="text-white text-5xl font-bold">Speadr</h2>
        <p className="text-zinc-400">Your All-in-One Reading Tool</p>
      </div>
      <div className="w-full flex flex-col gap-y-5">
        <div className="flex gap-x-5">
          <Option index={0} selected={selected === 0} setSelected={setSelected}>
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
          <Reader text={text.trim().split(" ")} speed={speed} setEnded={setEnded} />
        ) : (
          <textarea
            className="rounded-lg bg-zinc-900 w-full h-50 text-zinc-200 px-5 py-3 outline-none resize-none text-lg"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        )}
      </div>
      <div>
        <Button onclick={() => setReading(true)}>
          {reading && !ended ? <FaPause size={15} /> : <FaPlay size={15} />}
          {reading && !ended ? "Pause" : "Start"}
        </Button>
      </div>
    </motion.div>
  );
}

export default App;
