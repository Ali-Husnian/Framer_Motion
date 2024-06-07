/* eslint-disable react-hooks/exhaustive-deps */
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect } from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const gridSquireVariants = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const svgIconVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(252, 211, 77, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(252, 211, 77, 1)",
  },
};

const App = () => {
  const { scrollYProgress: completionProgress } = useScroll();

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControl = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"]
  );
  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  );

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    }
  }, [isInView]);

  return (
    <div className="felx flex-col gap-10 overflow-x-hidden">
      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 p-10 gap-10"
      >
        {/* easeIn and easeOut*/}
        <motion.div
          variants={gridSquireVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-20 h-20 bg-stone-100 rounded-lg "
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-20 h-20 bg-stone-100 rounded-full "
          ></motion.div>
        </motion.div>
        {/* easeIn and easeOut*/}

        {/* easeInOut scale rotate change radius*/}
        <motion.div
          variants={gridSquireVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.div
            className="w-1/3 h-1/3 shadow-md bg-rose-400"
            animate={{
              scale: [1, 2, 2, 1],
              rotate: [0, 90, 90, 0],
              borderRadius: ["10%", "10%", "50%", "10%"],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          ></motion.div>
        </motion.div>
        {/* easeInOut scale rotate change radius*/}

        {/* Button animate scale and transition*/}
        <motion.div
          variants={gridSquireVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#d1d5db",
              color: "black",
            }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            className="bg-emerald-600 rounded-lg py-4 w-1/2 font-light tracking-wide text-2xl text-gray-200  "
          >
            Subcribe
          </motion.button>
        </motion.div>
        {/* Button animate scale and transition*/}

        {/* Drag box*/}
        <motion.div
          variants={gridSquireVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.div
            drag
            dragConstraints={{
              top: -125,
              right: 125,
              bottom: 125,
              left: -125,
            }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            className="w-1/3 h-1/3 bg-orange-400 rounded-3xl cursor-grab"
          ></motion.div>
        </motion.div>
        {/* Drag box*/}

        {/* Scroll Progress*/}
        <motion.div
          variants={gridSquireVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.dev className="w-40 aspect-square bg-gray-50/20 rounded-xl">
            <motion.div
              className="bg-gray-400 w-full rounded-xl h-full origin-bottom"
              style={{ scaleY: completionProgress }}
            ></motion.div>
          </motion.dev>
        </motion.div>
        {/* Scroll Progress*/}
        {/* Svg animation*/}
        <motion.div
          variants={gridSquireVariants}
          className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >
            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              variants={svgIconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
                fill: {
                  duration: 2,
                  ease: "easeIn",
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
              }}
            />
          </motion.svg>
        </motion.div>
      </motion.section>
      {/* Text animation*/}
      <motion.section className="flex flex-col gap-10 mb-10" ref={containerRef}>
        <motion.h1
          className="text-5xl text-slate-200 text-center tracking-wide"
          initial="hidden"
          animate={mainControl}
          variants={{
            hidden: { opacity: 0, y: 0.75 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.3 }}
        >
          Just Keep Scrolling
        </motion.h1>
        <motion.p
          style={{ translateX: paragraphOneValue }}
          className="text-slate-100 text-4xl font-thin mx-auto w-1/2"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa qui
          ipsam repudiandae deleniti quos fuga delectus, sunt harum totam,
          repellendus beatae corporis explicabo!
        </motion.p>
        <motion.p
          style={{ translateX: paragraphTwoValue }}
          className="text-slate-100 text-4xl font-thin mx-auto w-1/2"
        >
          Quidem saepe veritatis a perspiciatis praesentium magni, dicta ex
          libero? Cum, nesciunt ratione eum magnam exercitationem aliquam
          laborum itaque culpa facilis mollitia dolorum distinctio alias,
        </motion.p>
      </motion.section>
    </div>
  );
};

export default App;

{
  /*
  
*/
}
