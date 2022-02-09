import * as ActionTypes from "../constants/editor";
export const setCanvas = (payload) => ({
    type: ActionTypes.CANVAS,
    payload
});

export const actChangeBGColor = (payload) => ({
    type: ActionTypes.CHANGE_BACKGROUND_COLOR,
    payload
});