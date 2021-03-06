
import * as ActionTypes from "./../constants/editor";
const init = {
    canvas: null,
    listItem: [],
    itemActive: null,
    removePointer: () => { }
};

const editorReducer = (state = init, { type, payload }) => {
    switch (type) {
        case ActionTypes.CANVAS:
            state.canvas = payload;
            return { ...state };
        case ActionTypes.SET_LIST_ITEM:
            state.listItem = payload;
            return { ...state };
        case ActionTypes.SET_ITEM_ACTIVE:
            state.itemActive = payload;
            return { ...state };
        case ActionTypes.SET_FUNCTION_REMOVE_POINTER:
            state.removePointer = payload;
            return { ...state };
        default:
            return state;
    }
};

export { editorReducer };