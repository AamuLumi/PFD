import {
    SHOW_FLOATING_MESSAGE
} from '../actions/LocalActions';

export function floatingMessage(state = {}, action){
    switch(action.type){
        case SHOW_FLOATING_MESSAGE:
            return Object.assign({}, state, {
                message: action.message,
                messageClass: action.messageClass,
                date: Date.now()
            });
        default:
            return state;
    }
}