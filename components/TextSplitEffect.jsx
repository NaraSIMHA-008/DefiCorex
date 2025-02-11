import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import JoinCreateEvent from "./JoinCreateEvent";
const TextSplitEffect = () => {
  const [val, setVal] = useState(false);
  const [displayIt, setDisplayIt] = useState(true);
  const scrolleffectStart = useRef(0);
  const controls = useAnimation();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [ref, inView] = useInView();

  // You can customize the animation properties
  const animationVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  const animationOptions = {
    variants: animationVariants,
    initial: "hidden",
    animate: inView && "visible",
    transition: { duration: 0.5 },
  };

  // Trigger animation when the element comes into view
  useEffect(() => {
    if (inView) {
      setDisplayIt(true);
      controls.start("visible");
    }

    scrolleffectStart.current = 576;
    if (window.innerWidth < 400) scrolleffectStart.current = 540;
  }, [controls, inView]);
  useEffect(() => {
    if (displayIt) {
      setTimeout(() => {
        window.addEventListener("scroll", handleScroll);
      }, 10);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayIt]);
  function handleScroll() {
    if (ref3.current && ref1.current && ref2.current) {
      if (
        window.scrollY - scrolleffectStart.current - window.innerHeight + 720 <=
          85 &&
        window.scrollY - scrolleffectStart.current - window.innerHeight + 720 >
          0
      ) {
        // document.getElementById("hello").style.height = `${
        //   18 + 0.4 * (window.scrollY - 630)
        // }vw`;
        ref1.current.style.transform = `translateY(${-Math.max(
          0,
          2.2 *
            (window.scrollY -
              scrolleffectStart.current -
              window.innerHeight +
              720)
        )}px)`;
        ref2.current.style.transform = `translateY(${Math.max(
          0,
          3.5 *
            (window.scrollY -
              scrolleffectStart.current -
              window.innerHeight +
              720)
        )}px)`;
      } else if (
        window.scrollY - scrolleffectStart.current - window.innerHeight + 720 >
        85
      ) {
        ref3.current.style.transitionDuration = "1000ms";
        ref3.current.style.opacity = 0;
      } else if (
        window.scrollY - scrolleffectStart.current - window.innerHeight + 720 <=
        0
      ) {
        // document.getElementById("hello").style.height = "18vw";
        ref1.current.style.transform = `translateY(${-Math.max(0, 0)}px)`;
        ref2.current.style.transform = `translateY(${Math.max(0, 0)}px)`;
      } else if (
        window.scrollY - scrolleffectStart.current - window.innerHeight + 720 >
        85
      ) {
        ref1.current.style.transform = `translateY(${-Math.max(
          0,
          2.2 * 85
        )}px)`;
        ref2.current.style.transform = `translateY(${Math.max(0, 3.5 * 85)}px)`;
      }
      if (
        window.scrollY -
          (scrolleffectStart.current + 49) -
          window.innerHeight +
          720 >
          0 &&
        ref1.current.style.transform !== "transform translateY(0px)"
      )
        setVal(true);
    }
  }
  return (
    <>
      <div className="w-screen h-[70vh] sm:h-screen flex justify-center items-start relative">
        <motion.div ref={ref}>
          {displayIt && (
            <>
              {val && (
                <motion.div
                  ref={ref}
                  animate={controls}
                  {...animationOptions}
                  className="-mt-12 sm:mt-0"
                >
                  <JoinCreateEvent />
                </motion.div>
              )}
              <div
                ref={ref3}
                style={{
                  height: "18vw",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  transitionDuration: "0.05s",
                }}
                className="flex flex-col justify-between items-center absolute"
              >
                <div
                  style={{
                    height: "12vw",
                  }}
                  ref={ref1}
                  className="mb-0 overflow-hidden"
                >
                  <div style={{ fontSize: "14vw" }} className="h-full">
                    What'sDefiCorex
                  </div>
                </div>
                <div
                  style={{ height: "6vw" }}
                  ref={ref2}
                  className=" overflow-hidden"
                >
                  <div
                    style={{
                      fontSize: "14vw",
                      transform: "translateY(-12vw)",
                    }}
                    className="h-full"
                  >
                    What'sDefiCorex
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default TextSplitEffect;
