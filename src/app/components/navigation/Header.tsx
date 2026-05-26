import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex flex-col justify-center items-center w-10 h-10 gap-[6px] z-50 relative focus:outline-none"
      aria-label="Toggle Menu"
    >
      {/* Top Line */}
      <motion.span
        initial={false}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 4 : 0,
          // Morphing the dimensions dynamically
          width: isOpen ? "24px" : "20px",
          height: isOpen ? "3px" : "2px",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        // Removed fixed w/h from Tailwind, leaving only color and rounding
        className="block bg-white rounded-full origin-center"
      />
      
      {/* Bottom Line */}
      <motion.span
        initial={false}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -4 : 0,
          // Matching the top line's morph
          width: isOpen ? "24px" : "20px",
          height: isOpen ? "3px" : "2px",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="block bg-white rounded-full origin-center"
      />
    </button>
  );
}