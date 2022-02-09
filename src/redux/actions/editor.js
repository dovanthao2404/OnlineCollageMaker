import * as ActionTypes from "../constants/editor";
export const setCanvas = (payload) => ({
    type: ActionTypes.CANVAS,
    payload
});

export const actChangeBGColor = (payload) => ({
    type: ActionTypes.CHANGE_BACKGROUND_COLOR,
    payload
});


export const actSetListObj = (payload) => ({
    type: ActionTypes.SET_LIST_ITEM,
    payload
});