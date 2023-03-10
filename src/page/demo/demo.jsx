import React, { useState } from "react";
import isValidPlace from '../../utils/inputVarification';

const DIRECTIONS = {
    NORTH: 'NORTH',
    EAST: 'EAST',
    SOUTH: 'SOUTH',
    WEST: 'WEST',
  };

const ACTIONS = {
    PLACE: 'PLACE',
    MOVE: 'MOVE',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    REPORT: 'REPORT',
    INVALID: 'INVALID'
}

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

    }

    const left = () => {
        
    }


    const ChooseAction = (input) => {
        if (input.includes('(') && input.includes(')')) {
        const actionName = input.split('(')[0];

        switch (actionName.toLowerCase()) {
            case 'PLACE':
                return ACTIONS.PLACE;
                break;
            case 'MOVE':
                return ACTIONS.MOVE;
                break;
            case 'LEFT':
                return ACTIONS.LEFT;
                break;
            case 'RIGHT':
                return ACTIONS.RIGHT;
                break;
            case 'REPORT':
                return ACTIONS.REPORT;
                break;
            default:
                return ACTIONS.INVALID;
        }
    }
}
}






const Form = () => {
    const [inputValue, setInptValue] = useState("")
    const [isPlaced, setIsPlaced] = useState(false)

    // handle the form inputs change
    const handleInputChange = (e) => {
        setInptValue(e.target.value)
    }

    // the logic after click the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label>
                Enter input:
                <input type="text" value={setInptValue} onChange={handleInputChange} />
            </label>
    
            {/* <textarea onChange={handleChange} name='commands' type='text' placeholder='commands list here' /> */}
            <button className='btn-submit-form' type='submit' />
        </form>
    )
}

export default Form;