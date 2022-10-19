import React from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.7,
      duration: 0.8,
    },
  },
};
const hue = (h) => `hsl(${h}, 100%, 50%)`;

const Cards = ({ emoji, hueA, hueB }) => {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <>
      <motion.div
        style={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          paddingTop: "20px",
          marginBottom: "-20px",
        }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 1 }}
      >
        <div
          style={{
            background,
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            top: "0",
            clipPath:
              'path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")',
          }}
        />
        <motion.div
          className=""
          style={{
            fontSize: "164px",
            width: "300px",
            height: "430px",
            display: "flex",
            alignItems: "center",
            justifycontent: "center",
            background: "white",
            borderRadius: " 20px",
            boxShadow:
              "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),  0 0 16px hsl(0deg 0% 0% / 0.075)",
            transformOrigin: " 10% 60%",
          }}
          variants={cardVariants}
        >
          {emoji}
        </motion.div>
      </motion.div>
    </>
  );
};

const Links = () => {
  const food = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
  ];

  return food.map(([emoji, hueA, hueB]) => (
    <Container
      style={{
        // margin: " 100px auto",
        maxWidth: "500px",
        // paddingBottom: "100px",
      }}
    >
      <Cards emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
    </Container>
  ));
};

export default Links;
