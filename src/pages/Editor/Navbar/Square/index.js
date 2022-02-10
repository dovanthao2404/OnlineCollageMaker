import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actSetListObj, actSetObjActive } from '../../../../redux/actions/editor';
export default function Square() {
    const [canvas, setCanvas] = useState();
    const { canvas: canvasGlobal } = useSelector(state => state.editorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const canvasEle = document.getElementById("square");
        const canvas = new fabric.Canvas(canvasEle, {
            width: 50,
            height: 50,
        });
        setCanvas(canvas);
    }, []);

    useEffect(() => {
        if (canvas) {
            const square = new fabric.Rect({
                width: 50,
                height: 50,
                fill: '#008000',
                hoverCursor: 'pointer',
                selectable: false
            });

            canvas.on("mouse:up", () => {

                const square = new fabric.Rect({
                    width: 50,
                    height: 50,
                    fill: '#008000',
                    hoverCursor: 'pointer',
                    selectable: true,
                    name: "square",
                    nameCommon: "geometry"
                });
                dispatch(actSetObjActive(square));
                square.on("mouseup", () => {
                    if (!canvasGlobal.isDrawingMode) {
                        dispatch(actSetObjActive(square));
                    }
                });
                canvasGlobal.add(square).setActiveObject(square);;
                canvasGlobal.isDrawingMode = false;
                canvasGlobal.renderAll();
                dispatch(actSetListObj(canvasGlobal.getObjects()));

            });


            canvas.add(square);
        }
    }, [canvas]);

    return (
        <div className="item">
            <canvas id="square"></canvas>
        </div>
    );
}
