import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actSetListObj } from '../../../../redux/actions/editor';
export default function Line() {
    const [canvas, setCanvas] = useState();
    const { canvas: canvasGlobal, removePointer } = useSelector(state => state.editorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const canvasEle = document.getElementById("line");
        const canvas = new fabric.Canvas(canvasEle, {
            width: 50,
            height: 50,
        });
        setCanvas(canvas);
    }, []);



    const addDot = (e, line) => {
        let obj = e.target;
        removePointer();
        if (line.status !== "have-dot") {
            let pointer1 = new fabric.Circle({
                id: "pointer1",
                radius: obj.strokeWidth * 3,
                fill: "blue", //color,
                opacity: 0.5,
                top: line.y1,
                left: line.x1,
                originX: "center",
                originY: "center",
                hashBorders: false,
                hasControls: false,
            });

            let pointer2 = new fabric.Circle({
                id: "pointer2",
                radius: obj.strokeWidth * 3,
                fill: "blue",
                opacity: 0.5,
                top: line.y2,
                left: line.x2,
                originX: "center",
                originY: "center",
                hashBorders: false,
                hasControls: false,
            });
            line.set("status", "have-dot");
            canvasGlobal.add(pointer1, pointer2);
            dispatch(actSetListObj(canvasGlobal.getObjects()));
            canvasGlobal.renderAll();

        }
    };


    useEffect(() => {
        if (canvas) {
            const line = new fabric.Line([0, 0, 200, 200], {
                selectable: false,
                hoverCursor: 'pointer',
                stroke: 'red',
                strokeWidth: 5,

            });
            canvas.on("mouse:up", () => {

                const line = new fabric.Line([50, 100, 200, 200], {
                    name: "line-straight",
                    selectable: false,
                    stroke: 'red', strokeWidth: 5,
                    hasBorders: false
                });
                removePointer();


                line.on("mouseup", (e,) => {
                    if (!canvasGlobal.isDrawingMode) {
                        addDot(e, line);
                    }
                });
                canvasGlobal.add(line);
                canvasGlobal.isDrawingMode = false;
                canvasGlobal.renderAll();
                dispatch(actSetListObj(canvasGlobal.getObjects()));

            });


            canvas.add(line);
        }
    }, [canvas]);

    return (
        <div className="item">
            <canvas id="line"></canvas>
        </div>
    );
}
