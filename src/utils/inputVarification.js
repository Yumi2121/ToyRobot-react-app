import React from 'react'

// const regexMove = /^move\(\)$/;
// const regexLeft = /^left\(\)$/;
// const regexReport = /^report\(\)$/;
// const regexPlace = /^place\(\d\s?,\s?\d,\s?'?(SOUTH|NORTH|WEST|EAST)'?\)$/;

export const isValidPlace = (input) => {
    const regex = /^\(\d\s?,\s?\d,\s?'?(SOUTH|NORTH|WEST|EAST)'?\)$/;
    const parenthesesValue = '(' + input.split('(')[1];
    const gridUnit = 5
   
    if (regex.test(parenthesesValue)) {
        // remove the white space and "()" in (0, 0, 'NORTH') => ['0', '0', 'NORTH']
        const parts = parenthesesValue.replace(/\s+/g, '').split(/[\s,()']+/).slice(1, -1);
        const x = parseInt(parenthesesValue[0]);
        const y = parseInt(parenthesesValue[1]);
        const robertPlaceValue = [x,y]

        if (x>=0 && x<=(gridUnit -1) && y>=0 && y<=(gridUnit -1)) return robertPlaceValue;
        else return false 
    }
}
