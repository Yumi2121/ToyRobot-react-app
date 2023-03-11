import { ACTIONS } from '../utils/data';

const ChooseAction = (input) => {
    if (input.includes('(') && input.includes(')')) {
    const actionName = input.split('(')[0];

    switch (actionName.toLowerCase()) {
        case 'PLACE':
            return ACTIONS.PLACE
            break;
        case 'MOVE':
            return ACTIONS.MOVE
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

export default ChooseAction;