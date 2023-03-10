import React from "react";
import { useState } from "react";
import isValidPlace from '../utils/inputVarification';
import { DIRECTIONS, ACTIONS } from '../utils/data';


const Robot = () => {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [direction, setDirection] = useState(null);
    const [isPlaced, setIsplaced] = useState(false);
  

    const place = (x, y, direction) => {
        if (isValidPlace) {
            setX(x);
            setY(y);
            setDirection(direction);
            setIsplaced(true);
            console.log(`Placed the robot at (${x}, ${y}), facing ${direction}`);
        } else {
            console.log('Invalid position or direction for placing the robot');
        }
    }

    const move = () => {
        if (!isPlaced) {
            console.log('Robot is not placed yet');
            return;
        }

        switch (direction) {
            case DIRECTIONS.NORTH:

        }
    }

    const left = () => {

    }
}

export default Robot;