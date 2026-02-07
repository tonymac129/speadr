import type { SettingsType } from "../App";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { BiCheck, BiPalette } from "react-icons/bi";
import { BsSpeedometer } from "react-icons/bs";
import { MdFontDownload } from "react-icons/md";
import { TbFocus } from "react-icons/tb";

type ModalProps = {
  close: () => void;
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
};

function Modal({ close, settings, setSettings }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickListener = (e: Event) => {
      if ((e.target as Node) === modalRef.current) {
        close();
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [close]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={modalRef}
      className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="flex flex-col gap-y-5 p-10 w-90 rounded bg-zinc-950"
      >
        <h2 className="text-white text-2xl text-center font-bold mb-5">Settings</h2>

        <div className="flex gap-x-7">
          <div className="text-zinc-400 flex items-center gap-x-3">
            <BsSpeedometer size={25} /> Speed (WPM)
          </div>
          <input
            type="number"
            placeholder="Speed"
            className="rounded w-15 bg-zinc-900 h-full text-zinc-200 px-2 text-center py-1.5 outline-none [&::-webkit-inner-spin-button]:appearance-none"
            value={settings.speed}
            onChange={(e) => setSettings({ ...settings, speed: Number(e.target.value) })}
          />
        </div>
        <div className="flex gap-x-7">
          <div className="text-zinc-400 flex items-center gap-x-3">
            <MdFontDownload size={25} /> Font size
          </div>
          <select
            className="w-20 bg-zinc-900 rounded py-1.5 cursor-pointer text-center appearance-none text-zinc-200 outline-none"
            value={settings.size}
            onChange={(e) => setSettings({ ...settings, size: e.target.value })}
          >
            <option value="s">Small</option>
            <option value="m">Default</option>
            <option value="l">Large</option>
          </select>
        </div>
        <div className="flex gap-x-7">
          <div className="text-zinc-400 flex items-center gap-x-3">
            <BiPalette size={25} /> Theme
          </div>
          <select
            className="w-25 bg-zinc-900 rounded py-1.5 cursor-pointer text-center appearance-none text-zinc-200 outline-none"
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
          >
            <option value="midnight">Midnight</option>
            <option value="daylight">Daylight</option>
            <option value="dusk">Dusk</option>
          </select>
        </div>
        <div className="flex gap-x-7 items-center">
          <div className="text-zinc-400 flex items-center gap-x-3">
            <TbFocus size={25} /> Focal point
          </div>
          <label className="w-5 h-5 rounded border-3 border-zinc-900 bg-transparent group cursor-pointer flex items-center justify-center relative">
            <BiCheck size={35} className="hidden group group-has-checked:block text-red-500 absolute -bottom-2" />
            <input
              type="checkbox"
              className="hidden"
              checked={settings.focus}
              onChange={(e) => setSettings({ ...settings, focus: e.target.checked })}
            />
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
