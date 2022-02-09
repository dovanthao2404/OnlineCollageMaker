
import * as ActionTypes from "./../constants/editor";
const init = {
    canvas: null,
    backgroundColor: "#ffff",
    listItem: []
};

const editorReducer = (state = init, { type, payload }) => {
    switch (type) {
        case ActionTypes.CANVAS:
            state.canvas = payload;
            return { ...state };
        case ActionTypes.CHANGE_BACKGROUND_COLOR:
            state.backgroundColor = payload;
            return { ...state };
        case ActionTypes.SET_LIST_ITEM:
            state.listItem = payload;
            return { ...state };
        default:
            return state;
    }
};

export { editorReducer };