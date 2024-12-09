import React from "react";

import "../../App.css";
import Card from "./Card";

import { v4 as uuidv4 } from "uuid";

const List = ({ cards }) => {
  const filteredCards = cards.filter((card) => card.poster_path); // filtering poster due to some poster's are missing
  console.log(filteredCards);
  return (
    <>
      {filteredCards.map((card) => (
        // TODO: add this in best practice
        <Card key={uuidv4} {...card} />
      ))}
    </>
  );
};

export default List;
