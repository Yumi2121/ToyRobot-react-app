// import React from "react";
// import { useState } from "react";
// import isValidPlace from '../utils/inputVarification';
// import { DIRECTIONS, ACTIONS } from '../tools/constants';


// const Robot = () => {
//     const [x, setX] = useState(null);
//     const [y, setY] = useState(null);
//     const [direction, setDirection] = useState(null);
//     const [isPlaced, setIsplaced] = useState(false);
  

//     const place = (x, y, direction) => {
//         if (isValidPlace) {
//             setX(x);
//             setY(y);
//             setDirection(direction);
//             setIsplaced(true);
//             console.log(`Placed the robot at (${x}, ${y}), facing ${direction}`);
//         } else {
//             console.log('Invalid position or direction for placing the robot');
//         }
//     }

//     const move = () => {
//         if (!isPlaced) {
//             console.log('Robot is not placed yet');
//             return;
//         }

//         switch (direction) {
//             case DIRECTIONS.NORTH:
//                 if (isValidPlace(x, y+1)) {
//                     setY(y+1);
//                     console.log(`Moved the robot to (${x}, ${y + 1})`);
//                 } else {
//                     console.log("Cannot move the robot, it will fall off the table");
//                 }
//                 break;
//             case DIRECTIONS.EAST:
//                 if (isValidPlace(x + 1, y)) {
//                     setX(x + 1);
//                     console.log(`Moved the robot to (${x + 1}, ${y})`);
//                 } else {
//                     console.log("Cannot move the robot, it will fall off the table");
//                 }
//                 break;
//             case DIRECTIONS.SOUTH:
//                 if (isValidPlace(x, y - 1)) {
//                     setY(y - 1);
//                     console.log(`Moved the robot to (${x}, ${y - 1})`);
//                 } else {
//                     console.log("Cannot move the robot, it will fall off the table");
//                 }
//                 break;
//             case DIRECTIONS.WEST:
//                 if (isValidPlace(x - 1, y)) {
//                     setX(x - 1);
//                     console.log(`Moved the robot to (${x - 1}, ${y})`);
//                 } else {
//                     console.log("Cannot move the robot, it will fall off the table");
//                 }
//                 break;
//             default:
//             return ACTIONS.INVALID;
//         }
//     }

//     const left = () => {
//         if (!isPlaced) {
//           console.log("Robot is not placed yet");
//           return;
//         }
    
//         switch (direction) {
//             case DIRECTIONS.NORTH:
//                 setDirection(DIRECTIONS.WEST);
//                 console.log("Rotated the robot to face", DIRECTIONS.WEST);
//                 break;
//             case DIRECTIONS.EAST:
//                 setDirection(DIRECTIONS.NORTH);
//                 console.log("Rotated the robot to face", DIRECTIONS.NORTH);
//                 break;
//             case DIRECTIONS.SOUTH:
//                 setDirection(DIRECTIONS.EAST);
//                 console.log("Rotated the robot to face", DIRECTIONS.EAST);
//                 break;
//             case DIRECTIONS.WEST:
//                 setDirection(DIRECTIONS.SOUTH);
//                 console.log("Rotated the robot to face", DIRECTIONS.SOUTH);
//                 break;
//             default:
//                 return ACTIONS.INVALID;
//         }
//     };

//     const right = () => {
//         if (!isPlaced) {
//             console.log("Robot is not placed yet");
//             return;
//         }

//         switch (direction) {
//             case DIRECTIONS.NORTH:
//                 setDirection(DIRECTIONS.EAST);
//                 console.log("Rotated the robot to face", DIRECTIONS.EAST);
//                 break;
//             case DIRECTIONS.EAST:
//                 setDirection(DIRECTIONS.SOUTH);
//                 console.log("Rotated the robot to face", DIRECTIONS.SOUTH);
//                 break;
//             case DIRECTIONS.SOUTH:
//                 setDirection(DIRECTIONS.WEST);
//                 console.log("Rotated the robot to face", DIRECTIONS.WEST);
//                 break;
//             case DIRECTIONS.WEST:
//                 setDirection(DIRECTIONS.NORTH);
//                 console.log("Rotated the robot to face", DIRECTIONS.NORTH);
//                 break;
//             default:
//                 return ACTIONS.INVALID;
//         }
//     };

//     const report = () => {
//         return (setX, setY, setDirection)
//     }
// }

// export default Robot;