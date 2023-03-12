// import { useRef } from "react";

// // const ChooseAction = (input) => {
// //     if (input.includes('(') && input.includes(')')) {
// //     const actionName = input.split('(')[0];

// //     switch (actionName.toLowerCase()) {
// //         case 'PLACE':
// //             return ACTIONS.PLACE;
// //             break;
// //         case 'MOVE':
// //             return ACTIONS.MOVE;
// //             break;
// //         case 'LEFT':
// //             return ACTIONS.LEFT;
// //             break;
// //         case 'RIGHT':
// //             return ACTIONS.RIGHT;
// //             break;
// //         case 'REPORT':
// //             return ACTIONS.REPORT;
// //             break;
// //         default:
// //             return ACTIONS.INVALID;
// //     }
// // }
// // }

// // export default ChooseAction;

// // canvas
// const Grid = () => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');

//         // Calculate the unit size
//         const unitSize = canvas.width / 5;
//         let xVelocity = unitSize;
//         let yVelocity = -unitSize;

//         // Set the line width and color
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = '#000';
//         ctx.strokeWidth = 1;
    
//         // Draw the vertical lines
//         for (let i = 1; i <= 5; i++) {
//             const x = i * unitSize;
//             ctx.beginPath();
//             ctx.moveTo(x, 0);
//             ctx.lineTo(x, canvas.height);
//             ctx.stroke();
//         }

//         // Draw the horizontal lines
//         for (let i = 1; i <= 5; i++) {
//             const y = i * unitSize;
//             ctx.beginPath();
//             ctx.moveTo(0, y);
//             ctx.lineTo(canvas.width, y);
//             ctx.stroke();
//         }

//         ctx.closePath();
//         return;

// }

// export default Grid;