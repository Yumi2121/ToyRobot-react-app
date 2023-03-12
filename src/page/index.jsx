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
        let commandType = ''
        if (command.match(placeCommandMatch)) {
            commandType = 'place';
        }
         if (command.match(moveCommandMatch)) {
            commandType = 'move'
        } else if (command.match(leftCommandMatch)) {
            commandType = 'left'
        } else if (command.match(rightCommandMatch)) {
            commandType=  'right'
        } else if (command.match(reportCommandMatch)) {
            commandType = 'report'
        } else {
            setUserMessage("Invalid command, please input the command with correct format!")
        }

        if (!isPlaced && commandType && commandType !== 'place') {
            setUserMessage("Robot is not placed yet. Please use valid place command firstly")
        } else {
            return commandType;
        }
    }

    // if command is place, destructure the command get value of x, y and direction
    // prepare for the later move
    const placeCommandProps = (command) => {
        console.log(`inputValue=${inputValue}`)
        // remove the white space and "()" in (0, 0, 'NORTH') => {'0', '0', 'NORTH'}
        const props = command.substring(6,command.length-1).split(',');
        return {
            x: parseInt(props[0]),
            y: parseInt(props[1].trim()),
            direction: props[2].trim(),     
        }   
       
    }

    //  handle a new place command
    const handlePlaceRob = (command) => {
        const {x, y, direction} = placeCommandProps(command);
        if (x > gridSize -1 || y > gridSize -1 || x<0 || y<0) {
            setUserMessage(`Invalid place, position was outside the table, please choose the valid posion within ${gridSize} X ${gridSize} unit`)
            return;
        }
        setCommandList(prevState => [...prevState, inputValue]);
        setCurrentPosition({
            x: x,
            y: y,
            direction: direction.replace(/[']/g,""),
        })
        setIsPlaced(true);
        setUserMessage('run successfully');
    }
   
    // handle move 
    const handleMove = () => {
        switch(currentPosition.direction) {
            case 'NORTH':
                currentPosition.y < gridSize -1 && setCurrentPosition({...currentPosition, y: currentPosition.y + 1})
                setUserMessage('run successfully');
                break;
            case 'SOUTH':
                currentPosition.y > 0 && setCurrentPosition({...currentPosition, y: currentPosition.y - 1})
                setUserMessage('run successfully');
                break;
            case 'EAST':
                currentPosition.x < gridSize - 1 && setCurrentPosition({...currentPosition, x: currentPosition.x + 1})
                setUserMessage('run successfully');
                break;
            case 'WEST':
                currentPosition.x > 0 && setCurrentPosition({...currentPosition, x: currentPosition.x - 1})
                setUserMessage('run successfully');
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
        switch(verifyCommand(command)) {
            case 'place':
                handlePlaceRob(command);
                break;
            case 'move':
                handleMove();
                setCommandList(prevState => [...prevState, inputValue])
                // ?????
                break;
            case 'left':
                handleDirecTurn('left')
                setCommandList(prevState => [...prevState, inputValue])
                setUserMessage('run successfully');
                break;
            case 'right':
                handleDirecTurn('right')
                setCommandList(prevState => [...prevState, inputValue])
                setUserMessage('run successfully');
                break;
            case 'report':
                setUserMessage(`${currentPosition.x}, ${currentPosition.y}, ${currentPosition.direction}`);
                setCommandList(prevState => [...prevState, inputValue])
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
        </>
    )
}

export default Index;