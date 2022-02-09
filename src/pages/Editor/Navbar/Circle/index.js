import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
export default function Circle() {
    const [canvas, setCanvas] = useState();

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
            const square = new fabric.Circle({
                radius: 25,
                fill: '#039BE5',
                selectable: false,
                moveCursor: "pointers"
            });
            canvas.add(square);
        }
    }, [canvas]);

    return (
        <div className="item">
            <canvas id="circle"></canvas>
        </div>
    );
}
