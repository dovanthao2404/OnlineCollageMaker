import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actSetListObj, actSetObjActive } from '../../../../redux/actions/editor';
export default function Circle() {
    const [canvas, setCanvas] = useState();
    const { canvas: canvasGlobal } = useSelector(state => state.editorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const canvasEle = document.getElementById("circle");
        const canvas = new fabric.Canvas(canvasEle, {
            width: 50,
            height: 50,
        });
        setCanvas(canvas);
    }, []);

    useEffect(() => {
        if (canvas) {
            const circle = new fabric.Circle({
                radius: 25,
                fill: '#039BE5',
                hoverCursor: 'pointer',
                selectable: false
            });

            canvas.on("mouse:up", () => {

                const circle = new fabric.Circle({
                    radius: 25,
                    fill: '#039BE5',
                    hoverCursor: 'pointer',
                    selectable: true,
                    name: "circle",
                    nameCommon: "geometry"
                });
                dispatch(actSetObjActive(circle));
                circle.on("mouseup", () => {
                    if (!canvasGlobal.isDrawingMode) {

                        dispatch(actSetObjActive(circle));
                    }
                });
                canvasGlobal.add(circle).setActiveObject(circle);;
                canvasGlobal.isDrawingMode = false;
                canvasGlobal.renderAll();
                dispatch(actSetListObj(canvasGlobal.getObjects()));

            });


            canvas.add(circle);
        }
    }, [canvas]);

    return (
        <div className="item">
            <canvas id="circle"></canvas>
        </div>
    );
}
