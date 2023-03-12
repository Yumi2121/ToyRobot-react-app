import React, { useState } from "react";
import { placeCommandMatch, moveCommandMatch, leftCommandMatch, rightCommandMatch, reportCommandMatch, gridSize } from "../tools/constants";
import Button from 'react-bootstrap/Button';

import "./style.css";

const Index = () => {
    const [inputValue, setInptValue] = useState('');
    const [isPlaced, setIsPlaced] = useState(false);
    const [currentPosition, setCurrentPosition] = useState({})
    const [commandList, setCommandList] = useState([]);
    const [userMessage, setUserMessage] = useState('');
   
    // verifying all five commands to check if they are valid (through Regex) 
    const verifyCommand = (command) => {
        if (command.match(placeCommandMatch)) {
            setIsPlaced(true);
            console.log(`Placed the robot at current position ${currentPosition}`);
            return 'place';
        }

        if (!isPlaced) {
            setUserMessage("Robot is not placed yet.")
        } else if (command.match(moveCommandMatch)) {
            return 'move'
        } else if (command.match(leftCommandMatch)) {
            return 'left'
        } else if (command.match(rightCommandMatch)) {
            return 'right'
        } else 
            setUserMessage("Invalid command, please re-write the command!")
    }

    // if command is place, destructure the command get value of x, y and direction
    // prepare for the later move
    const placeCommandProps = (command) => {
        console.log(`inputValue=${inputValue}`)
        // remove the white space and "()" in (0, 0, 'NORTH') => {'0', '0', 'NORTH'}
        const props = command.split(/[\s,()']+/).slice(1, -1);
        return {
            x: parseInt(props[0]),
            y: parseInt(props[1]),
            direction: props[2].trim(),     
        }   
       
    }

    //  handle a new place command
    const handlePlaceRob = (command) => {
        const {x, y, direction} = placeCommandProps(command);
        if (x > gridSize -1 || y > gridSize -1 || x<0 || y<0) {
            setUserMessage(`Invalid place, position was outside the table, please choose the valid posion within ${gridSize} X ${gridSize} unit`)
        }
        setCurrentPosition({
            x: x,
            y: y,
            direction: direction,
        })
    }
   
    // handle move 
    const handleMove = () => {
        switch(currentPosition.direction) {
            case 'NORTH':
                currentPosition.y < gridSize -1 && setCurrentPosition({...currentPosition, y: currentPosition.y + 1})
                break;
            case 'SOUTH':
                currentPosition.y > 0 && setCurrentPosition({...currentPosition, y: currentPosition.y - 1})
                break;
            case 'EAST':
                currentPosition.x < gridSize - 1 && setCurrentPosition({...currentPosition, x: currentPosition.x + 1})
                break;
            case 'WEST':
                currentPosition.x > 0 && setCurrentPosition({...currentPosition, x: currentPosition.x - 1})
                break;
            default:
                setUserMessage("Cannot move the robot, it will fall off the table!")
        }
    }

    // handle direction turning
    const handleDirecTurn = (direction) => {
        if (direction === 'left') {
            switch (currentPosition.direction) {
                case 'NORTH':
                    setCurrentPosition({...currentPosition, direction: 'WEST'})
                    break;
                case 'EAST':
                    setCurrentPosition({...currentPosition, direction: 'NORTH'})
                    break;
                case 'SOUTH':
                    setCurrentPosition({...currentPosition, direction: 'EAST'})
                    break;
                case 'WEST':
                    setCurrentPosition({...currentPosition, direction: 'SOUTH'})
                    break;
                default:
                    return;
            }
        } else if (direction === 'right') {
            switch (currentPosition.direction) {
                case 'NORTH':
                    setCurrentPosition({...currentPosition, direction: 'EAST'})
                    break;
                case 'EAST':
                    setCurrentPosition({...currentPosition, direction: 'SOUTH'})
                    break;
                case 'SOUTH':
                    setCurrentPosition({...currentPosition, direction: 'WEST'})
                    break;
                case 'WEST':
                    setCurrentPosition({...currentPosition, direction: 'NORTH'})
                    break;
                default:
                    return;
            }
        }
    }

    // hadle all valid command form input
    const handleInputCommand = (command) => {
        switch(verifyCommand) {
            case 'place':
                handlePlaceRob(command);
                setCommandList(prevState => [{...prevState, inputValue}])
                break;
            case 'move':
                handleMove();
                setCommandList(prevState => [{...prevState, inputValue}])
                break;
            case 'left':
                handleDirecTurn('left')
                setCommandList(prevState => [{...prevState, inputValue}])
                break;
            case 'right':
                handleDirecTurn('right')
                setCommandList(prevState => [{...prevState, inputValue}])
                break;
            case 'report':
                currentPosition();
                setCommandList(prevState => [{...prevState, inputValue}])
                break;
            default:
                return;       
        }
        setInptValue('')
    }

    // the logic after click the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleInputCommand(inputValue)
    }


    return (
        <>
        <form className='form' onSubmit={handleSubmit}>
            <label>
                Enter input:
                <input type="text" value={inputValue} onChange={(e) => {setInptValue(e.target.value)}} />
            </label>
    
            {/* <textarea onChange={handleChange} name='commands' type='text' placeholder='commands list here' /> */}
            <Button className='btn-submit-form' variant="primary" type='submit'>Submit</Button>
        </form>

        <div className="commandList">
        {commandList.map((item) => 
            <div key={item}>{item}</div>
        )}
        </div>

        <p style={{ color: "white" }}>
            <b>{userMessage}</b>
        </p>
        

        {/* <div className="grid">
            <canvas id='gridTable' ref={canvasRef} width={500} height={500}></canvas>
        </div> */}
        </>
    )
}

export default Index;