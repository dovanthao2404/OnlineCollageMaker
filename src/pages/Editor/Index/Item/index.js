import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actSetListObj } from '../../../../redux/actions/editor';

export default function Item({ item }) {
    const { canvas } = useSelector(state => state.editorReducer);
    const src = item?._originalElement.currentSrc;
    const dispatch = useDispatch();



    return (
        <div className='item'>
            <img src={src} alt="" />
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
            {canvas.getObjects().indexOf(item)}
        </div>
    );
}
