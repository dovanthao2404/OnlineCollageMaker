import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from "fabric";
import { actSetListObj, actSetObjActive, setCanvas } from '../../../../redux/actions/editor';

export default function Photo() {

    const { canvas } = useSelector(state => state.editorReducer);
    const dispatch = useDispatch();


    useEffect(() => {
        const canvasWrapper = document.querySelector("#canvas-wrapper");
        const canvas = new fabric.Canvas('canvas', {
            width: canvasWrapper.offsetWidth,
            height: canvasWrapper.offsetHeight
        });
        canvas.on("mouse:down", (e) => {
            if (!canvas.isDrawingMode) {
                if (e.target === null) {
                    dispatch(actSetObjActive(null));
                }
            }
        });
        dispatch(setCanvas(canvas));
    }, []);

    useEffect(() => {
        if (canvas) {
            canvas.backgroundColor = "#333";
            canvas.on('mouse:up', function (e) {
                if (!canvas.isDrawingMode) {
                    dispatch(actSetObjActive(e.target));
                }
            });
            canvas.on("after:render", function (e) {
                if (canvas.isDrawingMode) {

                    const canvasTemp = canvas.getObjects()[canvas.getObjects().length - 1];

                    canvasTemp.set("name", "line");
                    canvasTemp.set("stroke", "#000000");


                    dispatch(actSetListObj(canvas.getObjects()));
                }
            });



            canvas.renderAll();
        }

    }, [canvas]);

    return (
        <div className='content'>
            <div id="canvas-wrapper" className="canvas">
                <canvas id="canvas"></canvas>
            </div>
        </div>
    );
}
