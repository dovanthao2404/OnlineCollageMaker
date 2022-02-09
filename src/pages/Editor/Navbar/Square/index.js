import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
export default function Square() {
    const [canvas, setCanvas] = useState();

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
                fill: 'green',
                // lockRotation: true,
                targetFindTolerance: 2
                ,
                hoverCursor: 'pointer',
                selectable: false
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
