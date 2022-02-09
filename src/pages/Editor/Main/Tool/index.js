import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actChangeBGColor, actSetListObj } from '../../../../redux/actions/editor';
export default function Tool() {
    const dispatch = useDispatch();

    const { canvas } = useSelector(state => state.editorReducer);


    const handleRemove = () => {
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
            canvas.renderAll();
            dispatch(actSetListObj(canvas.getObjects()));

        };
    };

    const handleDeleteAll = () => {
        canvas.remove(...canvas.getObjects());
        dispatch(actSetListObj(canvas.getObjects()));
    };

    return (
        <div className="tool">
            <div className="tool-item">
                <span>Background </span><input type="color" onChange={(e) => {
                    dispatch(actChangeBGColor(e.target.value));
                }} />
            </div>
            <div className="tool-item">

                <button onClick={handleRemove}>Delete One</button>
                <button onClick={handleDeleteAll}>Delete All</button>
            </div>
        </div>
    );
}
