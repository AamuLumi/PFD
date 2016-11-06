export const SHOW_FLOATING_MESSAGE = 'SHOW_FLOATING_MESSAGE';

export const MESSAGE_CLASSES = {
    ERROR : 'error',
    SUCCESS : 'success'
};

export function showFloatingMessage(params){
    return (dispatch) => {
        dispatch({
            type: SHOW_FLOATING_MESSAGE,
            ...params
        });
    };
}