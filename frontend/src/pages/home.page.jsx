import React from "react";
import { Container } from "react-bootstrap";
import ListGroups from "../components/listGroup";
import WeekofTheDay from "../components/weekofTheDay";

export default function homePage() {
  return (
    <Container>
      <WeekofTheDay />
      <br />
      <ListGroups />
    </Container>
  );
}
