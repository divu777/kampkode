"use client";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex flex-col w-11/12 lg:w-3/4 fixed top-4 lg:top-10 inset-x-0 mx-auto border rounded-2xl text-black border-slate-400/10 bg-white shadow-2xl shadow-purple-500/50 p-4 lg:px-4 lg:py-2 items-center justify-between space-y-4 lg:space-y-0",
          className
        )}
      >
        <div className="flex w-full justify-between items-center lg:hidden">
          <div className="text-2xl font-bold ">NAVBAR</div>
          <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div className="hidden lg:flex w-full justify-between items-center">
          <div className="text-3xl lg:text-4xl p-2 font-semibold">NAVBAR</div>
          <div className="flex space-x-6">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                to={navItem.link}
                className={cn(
                  "relative items-center flex space-x-1 text-black hover:text-gray-400 font-semibold"
                )}
              >
                <div className="text-sm">{navItem.name}</div>
              </Link>
            ))}
          </div>
          <div className="flex space-x-3">
            <button className="border-2 border-purple-600 text-sm font-medium text-purple-600 px-4 py-2 rounded-full hover:bg-purple-100 transition-colors duration-300">
              Login
            </button>
            <button className="bg-purple-600 text-sm font-medium text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
              Sign Up
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-col w-full lg:hidden space-y-4">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                to={navItem.link}
                className={cn(
                  "relative items-center flex space-x-1 text-black hover:text-gray-400 font-semibold"
                )}
              >
                <div className="text-sm">{navItem.name}</div>
              </Link>
            ))}
            <div className="flex flex-col space-y-2">
              <button className="border-2 border-purple-600 text-sm font-medium text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors duration-300">
                Login
              </button>
              <button className="bg-purple-600 text-sm font-medium text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
