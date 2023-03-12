import React, { useState } from "react";
import { placeCommandMatch, moveCommandMatch, leftCommandMatch, rightCommandMatch, reportCommandMatch, gridSize } from "../tools/constants";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';


const Index = () => {
    const [inputValue, setInptValue] = useState('');
    const [isPlaced, setIsPlaced] = useState(false);
    const [currentPosition, setCurrentPosition] = useState({})
    const [commandList, setCommandList] = useState([]);
    const [userMessage, setUserMessage] = useState({
        type: '',
        text: '',
    });
   
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
            setUserMessage({
                type: 'danger',
                text: "Invalid command, please input the command with correct format!"
            })
        }

        if (!isPlaced && commandType && commandType !== 'place') {
            setUserMessage({
                type: 'danger',
                text: "Robot is not placed yet. Please use valid place command firstly"
            })
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
            setUserMessage({
                type: 'danger',
                text: `Invalid place, position was outside the table, please choose the valid posion within ${gridSize} X ${gridSize} unit`,
            })
            return;
        }
        setCommandList(prevState => [...prevState, inputValue]);
        setCurrentPosition({
            x: x,
            y: y,
            direction: direction.replace(/[']/g,""),
        })
        setIsPlaced(true);
        setCommandList([inputValue]);
        setUserMessage({
            type: 'success',
            text: 'Function executed successfully.',
        });
    }
   
    // handle move 
    const handleMove = () => {
        switch(currentPosition.direction) {
            case 'NORTH':
                if (currentPosition.y < gridSize -1 ) {
                    setCurrentPosition({...currentPosition, y: currentPosition.y + 1})
                    setUserMessage({
                        type: 'success',
                        text: 'Function executed successfully.'
                    });
                } else if (currentPosition.y === (gridSize -1)){
                    setUserMessage({
                        type: 'danger',
                        text: 'Cannot move the robot, it will fall off the table!'
                    });
                }
                break;
            case 'SOUTH':
                if (currentPosition.y > 0 ) {
                    setCurrentPosition({...currentPosition, y: currentPosition.y - 1})
                    setUserMessage({
                        type: 'success',
                        text: 'Function executed successfully.',
                    });
                } else if (currentPosition.y === 0) {
                    setUserMessage({
                        type: 'danger',
                        text: 'Cannot move the robot, it will fall off the table!'
                    })
                }
                break;
            case 'EAST':
                if (currentPosition.x < gridSize - 1) {
                    setCurrentPosition({...currentPosition, x: currentPosition.x + 1})
                    setUserMessage({
                        type: 'success',
                        text: 'Function executed successfully.'
                    });
                } else if (currentPosition.x === (gridSize -1)){
                    setUserMessage({
                        type: 'danger',
                        text: 'Cannot move the robot, it will fall off the table!'
                    });
                }
                break;
            case 'WEST':
                if (currentPosition.x > 0) {
                    setCurrentPosition({...currentPosition, x: currentPosition.x - 1})
                    setUserMessage({
                        type: 'success',
                        text: 'Function executed successfully.'
                    });
                } else if (currentPosition.x === 0) {
                    setUserMessage({
                        type: 'danger',
                        text: 'Cannot move the robot, it will fall off the table!'
                    })
                }
                break;
            default:
                return;
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
                break;
            case 'left':
                handleDirecTurn('left')
                setCommandList(prevState => [...prevState, inputValue])
                setUserMessage({
                    type: 'success',
                    text: 'Function executed successfully.'
                });
                break;
            case 'right':
                handleDirecTurn('right')
                setCommandList(prevState => [...prevState, inputValue])
                setUserMessage({
                    type: 'success',
                    text: 'Function executed successfully.',
                });
                break;
            case 'report':
                setUserMessage({
                    type: 'primary',
                    text: `${currentPosition.x}, ${currentPosition.y}, ${currentPosition.direction}`
                });
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
        <h1>Toy Robot</h1>
        <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                {/* <Form.Label>Command</Form.Label> */}
                <Form.Control type="text" value={inputValue} onChange={(e) => {setInptValue(e.target.value)}} placeholder="command eg: place(0, 0, 'NORTH')" />
                <Form.Text className="text-muted">
                    Please use the following format for commands: place(x, y, facing), move(), left(), right(), or report().
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      
        
        <Alert className="alert" key={userMessage.type} variant={userMessage.type}>
            {userMessage.text}
        </Alert>

        <Accordion  className="commandList" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Command History</Accordion.Header>
                    <Accordion.Body>     
                        <ListGroup as="ol" numbered>
                        {commandList.map((item) =>
                            <ListGroup.Item as="li">{item}</ListGroup.Item>
                        )}
                        </ListGroup>
                    </Accordion.Body> 
            </Accordion.Item>
            </Accordion>
        </>
    )
}

export default Index;