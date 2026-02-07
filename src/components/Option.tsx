import { motion } from "framer-motion";

type OptionProps = {
  children: React.ReactNode;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};

function Option({ children, selected, setSelected, title }: OptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.07, y: -1 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`${selected ? "bg-zinc-700" : "bg-zinc-900"} text-zinc-200 rounded-lg font-bold px-3 py-2 cursor-pointer flex items-center gap-x-3`}
      onClick={() => setSelected(!selected)}
      title={title || ""}
    >
      {children}
    </motion.button>
  );
}

export default Option;
