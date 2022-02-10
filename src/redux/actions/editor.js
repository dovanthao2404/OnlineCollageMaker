import * as ActionTypes from "../constants/editor";
export const setCanvas = (payload) => ({
    type: ActionTypes.CANVAS,
    payload
});


export const actSetListObj = (payload) => ({
    type: ActionTypes.SET_LIST_ITEM,
    payload
});


export const actSetObjActive = (payload) => ({
    type: ActionTypes.SET_ITEM_ACTIVE,
    payload
});
export const actSetFunctionRemovePointer = (payload) => ({
    type: ActionTypes.SET_FUNCTION_REMOVE_POINTER,
    payload
});