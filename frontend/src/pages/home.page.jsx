import React from "react";
import ListGroups from "../components/listGroup";
import WeekofTheDay from "../components/weekofTheDay";

export default function homePage() {
  return (
    <div>
      <WeekofTheDay />
      <br></br>
      <ListGroups />
    </div>
  );
}
