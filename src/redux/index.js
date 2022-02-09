import { combineReducers, createStore } from "redux";
import { editorReducer } from "./reducers/editor";


const rootReducer = combineReducers({ editorReducer });

const store = createStore(rootReducer);

export { store };