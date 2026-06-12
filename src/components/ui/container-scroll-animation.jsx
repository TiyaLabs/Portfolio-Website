import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  screenClassName = "bg-white dark:bg-[#0a0a0a]",
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 1] : [1.02, 1];
  };

  const rotate = useTransform(smoothProgress, [0, 0.4], [20, 0]);
  const scale = useTransform(smoothProgress, [0, 0.4], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 0.4], [0, -50]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-2 md:p-4"
      ref={containerRef}
    >
      <div
        className="py-8 md:py-16 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} screenClassName={screenClassName}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  screenClassName,
  children,
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 10px 30px rgba(0, 0, 0, 0.1), 0 40px 60px rgba(0, 0, 0, 0.05), 0 80px 100px rgba(0, 0, 0, 0.02)",
      }}
      className={`max-w-7xl mt-6 md:mt-10 mx-auto h-auto w-full rounded-[32px] shadow-2xl ${screenClassName}`}
    >
      <div className="w-full h-full p-6 md:p-12 pb-16 md:pb-24">
        {children}
      </div>
    </motion.div>
  );
};
