import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from "fabric";
import { actSetListObj, actSetObjActive, setCanvas, actSetFunctionRemovePointer } from '../../../../redux/actions/editor';

export default function Photo() {

    const { canvas } = useSelector(state => state.editorReducer);
    const dispatch = useDispatch();
    const endPointOfLineFollowPointer = (o) => {
        let objet = o?.target;
        if (objet) {
            if (objet.id === "pointer1") {
                canvas?.getObjects().forEach((objItem) => {
                    if (objItem.status === "have-dot") {
                        objItem.set({
                            x1: objet.left,
                            y1: objet.top,
                        });
                        objItem.setCoords();
                    }
                });
            } else if (objet.id === "pointer2") {
                canvas?.getObjects().forEach((objItem) => {
                    if (objItem.status === "have-dot") {
                        objItem.set({
                            x2: objet.left,
                            y2: objet.top,
                        });
                        objItem.setCoords();
                    }
                });
            }
        }
    };
    const removePointersOnSelectionCleared = () => {
        canvas?.getObjects().forEach((o) => {
            if (o.id === "pointer1" || o.id === "pointer2") {
                canvas.remove(o);
                dispatch(actSetListObj(canvas.getObjects()));
            }
        });
        canvas?.requestRenderAll();
    };

    const removePointersOnSelectionUpdate = (o) => {
        let obj = o.target || o;
        if (obj?.status === "have-dot") {
            obj.set("status", "");
            removePointersOnSelectionCleared();
            dispatch(actSetObjActive(null));
        }
    };

    useEffect(() => {
        const canvasWrapper = document.querySelector("#canvas-wrapper");
        const canvas = new fabric.Canvas('canvas', {
            width: canvasWrapper.offsetWidth,
            height: canvasWrapper.offsetHeight
        });


        dispatch(setCanvas(canvas));
    }, []);

    const removePointerHaveDot = () => {

        canvas?.getObjects().forEach((o) => {
            if (o.status === "have-dot") {
                removePointersOnSelectionUpdate(o);
            }
        });
    };

    useEffect(() => {
        dispatch(actSetFunctionRemovePointer(removePointerHaveDot));
    }, [canvas, dispatch]);

    useEffect(() => {
        if (canvas) {
            canvas.backgroundColor = "#333";
            canvas.on('mouse:up', function (e) {
                const listId = ["pointer1", "pointer2"];
                const listName = ["line-straight"];
                if (!canvas.isDrawingMode && !listName.includes(e?.target?.name) && !listId.includes(e?.target?.id)) {
                    removePointerHaveDot();
                    dispatch(actSetObjActive(e.target));
                }
            });
            canvas.on("mouse:down", (e) => {
                if (!canvas.isDrawingMode) {
                    if (e.target === null) {
                        dispatch(actSetObjActive(null));
                        removePointerHaveDot();

                    }
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

            canvas.on({
                "object:moving": endPointOfLineFollowPointer,
                "selection:cleared": removePointersOnSelectionCleared,
                "selection:updated": removePointersOnSelectionUpdate,
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
