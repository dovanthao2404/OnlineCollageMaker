import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actSetListObj, actSetObjActive } from '../../../../redux/actions/editor';
export default function Triangle() {
  const [canvas, setCanvas] = useState();
  const { canvas: canvasGlobal } = useSelector(state => state.editorReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const canvasEle = document.getElementById("triangle");
    const canvas = new fabric.Canvas(canvasEle, {
      width: 50,
      height: 50,
    });
    setCanvas(canvas);
  }, []);

  useEffect(() => {
    if (canvas) {
      const triangle = new fabric.Triangle({
        width: 50,
        height: 50,
        fill: '#58d9b8',
        selectable: false
      });
      canvas.on("mouse:up", () => {

        const triangle = new fabric.Triangle({
          width: 50,
          height: 50,
          fill: '#58d9b8',
          hoverCursor: 'pointer',
          selectable: true,
          name: "triangle",
          nameCommon: "geometry"
        });
        dispatch(actSetObjActive(triangle));
        triangle.on("mouseup", () => {
          if (!canvasGlobal.isDrawingMode) {
            dispatch(actSetObjActive(triangle));
          }
        });
        canvasGlobal.add(triangle).setActiveObject(triangle);
        canvasGlobal.isDrawingMode = false;
        canvasGlobal.renderAll();
        dispatch(actSetListObj(canvasGlobal.getObjects()));

      });


      canvas.add(triangle);
    }
  }, [canvas]);

  return (
    <div className="item">
      <canvas id="triangle"></canvas>
    </div>
  );
}
