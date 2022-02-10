import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actSetListObj, actSetObjActive } from '../../../../redux/actions/editor';

export default function Item({ item }) {
    const { canvas, itemActive } = useSelector(state => state.editorReducer);
    const src = item?._originalElement?.currentSrc;
    const dispatch = useDispatch();
    let classActive = "";
    if (itemActive === item) {
        classActive = "active";
    }
    if (item.id !== "pointer1" && item.id !== "pointer2") {
        return (
            <div className={`item ${classActive}`}>
                {src ? <img src={src} alt="" /> : item.name}
                <button onClick={() => {
                    canvas.moveTo(item, canvas.getObjects().indexOf(item) + 1);
                    canvas.requestRenderAll();
                    dispatch(actSetListObj(canvas.getObjects()));

                }}>up</button>
                <button onClick={() => {
                    if (canvas.getObjects().indexOf(item) !== 0) {
                        canvas.moveTo(item, canvas.getObjects().indexOf(item) - 1);
                        canvas.requestRenderAll();
                        dispatch(actSetListObj(canvas.getObjects()));
                    }
                }}>down</button>

                <button onClick={() => {
                    canvas.remove(item);
                    canvas.renderAll();
                    dispatch(actSetListObj(canvas.getObjects()));
                    dispatch(actSetObjActive(null));
                }}>
                    delete
                </button>
                {canvas.getObjects().indexOf(item)}
            </div>
        );
    }
    return <>  </>;
}
