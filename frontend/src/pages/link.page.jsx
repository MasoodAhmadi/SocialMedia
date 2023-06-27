import React from "react";
import { Container } from "react-bootstrap";
// import Card from "../components/common/Card";

import { motion } from "framer-motion";
import "../components/common/link.css";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.2,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

const Cards = ({ emoji, hueA, hueB }) => {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="cardcontainersss"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splashss" style={{ background }} />
      <motion.div className="motionCard" variants={cardVariants}>
        {emoji}
      </motion.div>
    </motion.div>
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
        margin: " 100px auto",
        maxWidth: "500px",
        paddingBottom: "100px",
      }}
    >
      <Cards emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
    </Container>
  ));
};
export default Links;
