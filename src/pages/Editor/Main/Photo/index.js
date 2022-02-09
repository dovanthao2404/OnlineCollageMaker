import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from "fabric";
import { setCanvas } from '../../../../redux/actions/editor';

export default function Photo() {

    const { canvas, backgroundColor } = useSelector(state => state.editorReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const canvasWrapper = document.querySelector("#canvas-wrapper");
        const canvas = new fabric.Canvas('canvas', {
            width: canvasWrapper.offsetWidth,
            height: canvasWrapper.offsetHeight
        });
        dispatch(setCanvas(canvas));
    }, []);

    useEffect(() => {
        if (canvas) {
            canvas.backgroundColor = "#333";
            canvas.renderAll();
        }

    }, [canvas]);


    useEffect(() => {
        if (canvas) {
            canvas.backgroundColor = backgroundColor;
            canvas.renderAll();
        }
    }, [backgroundColor]);

    return (
        <div className='content'>
            <div id="canvas-wrapper" className="canvas">
                <canvas id="canvas"></canvas>
            </div>
        </div>
    );
}
