import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Container, ListGroup, Form, Row, Col } from "react-bootstrap";
import { endPoints } from "../config/endPoints";
import axios from "axios";
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

const Cards = ({ emoji, hueA, hueB, Label }) => {
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
            // fontSize: "164px",
            width: "280px",
            height: "400px",
            display: "flex",
            // paddingLeft: "1.5rem",
            alignItems: "center",
            justifycontent: "center",
            background: "white",
            borderRadius: " 20px",
            boxShadow:
              "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),  0 0 16px hsl(0deg 0% 0% / 0.075)",
            // transformOrigin: " 20% 60%",
          }}
          variants={cardVariants}
        >
          {/* <div className="d-flex justify-items-center"> */}
          {/* <Card
            className="text-center"
            style={{ width: "", height: "", paddingBottom: "0rem" }}
          >
            <Card.Header as="h5">{Label}</Card.Header>
            <Card.Img
              style={{ width: "", height: "" }}
              variant="top"
              src={emoji}
            />
          </Card> */}
          {/* </div> */}
          <Card style={{}}>
            <Card.Body>
              <Card.Title className="mb-2 d-flex justify-content-center">
                MONDAY
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted d-flex justify-content-center">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text style={{ background: "white" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Img
                style={{ width: "", height: "" }}
                variant="top"
                src={emoji}
                onClick={() => console.log("click me")}
              />
              {/* <ListGroup variant="flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup> */}
              <br />
            </Card.Body>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

const Links = () => {
  const [allItem, setAllItems] = useState([]);
  const { allData } = endPoints;

  const getAllItems = async () => {
    try {
      const respond = await axios.get(allData);

      setAllItems(respond);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllItems();
    // window.addEventListener("resize", () => setSize(window.innerWidth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("data", allItem.data);
  return allItem?.data?.slice(0, 3).map((el) => {
    return (
      <Row>
        <Col>
          <Container
            style={{
              // margin: " 100px auto",
              maxWidth: "500px",
              // paddingBottom: "100px",
              background: "",
            }}
          >
            <Cards
              emoji={el.image}
              hueA={el.hueA}
              hueB={el.hueB}
              key={el.id}
              Label={el.item}
            />
            <Form>
              <div
                className="mb-3 mt-5"
                style={{
                  color: "white",
                  transform: "scale(2)",
                  paddingLeft: "12rem",
                }}
              >
                <Form.Check
                  label="click here"
                  // type={type}
                  // id={`default-${type}`}
                  // label={`default ${type}`}
                />
              </div>
            </Form>{" "}
          </Container>
        </Col>
      </Row>
    );
  });
  // );
};

export default Links;
