import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actChangeBGColor, actSetListObj, actSetObjActive } from '../../../../redux/actions/editor';

import { fabric } from "fabric";

export default function Tool() {
    const dispatch = useDispatch();

    const { canvas, } = useSelector(state => state.editorReducer);
    const [isPen, setIsPen] = useState(false);
    const itemActive = canvas?.getActiveObject();

    const handleRemove = () => {
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
            canvas.renderAll();
            dispatch(actSetListObj(canvas.getObjects()));
            dispatch(actSetObjActive(null));
        };
    };

    const handleDeleteAll = () => {
        canvas.remove(...canvas.getObjects());
        dispatch(actSetListObj(canvas.getObjects()));
        dispatch(actSetObjActive(null));
    };

    const handleDiscardActive = () => {
        canvas.discardActiveObject();
        canvas.renderAll();
        dispatch(actSetObjActive(null));
    };

    const handleRenderToolGeometry = () => {
        if (itemActive?.nameCommon === "geometry") {
            return <>
                <span>Background {itemActive.name}  </span>
                <input type="color" onChange={(e) => {
                    itemActive.set("fill", e.target.value);
                    canvas.renderAll();
                }} defaultValue={itemActive?.fill} />
            </>;
        }
        return <></>;
    };

    const handleRenderToolGeometryBorder = () => {
        if (itemActive?.name?.includes("border")) {
            return <>
                <span>border color</span>
                <input type="color" onChange={(e) => {
                    itemActive.set("stroke", e.target.value);
                    canvas.renderAll();
                }} defaultValue={itemActive?.stroke} />
                <span>border width</span>
                <input type="number" min={1} onChange={(e) => {
                    if (+e.target.value > itemActive.strokeWidth) {
                        const valueRaise = + (+e.target.value - itemActive.strokeWidth);
                        itemActive.set("width", itemActive.width + valueRaise);
                        itemActive.set("height", itemActive.height + valueRaise);
                        itemActive.set("radius", itemActive.radius + valueRaise);
                    } else {
                        const valueDecrease = + (- +e.target.value + itemActive.strokeWidth);
                        itemActive.set("width", itemActive.width - valueDecrease);
                        itemActive.set("height", itemActive.height - valueDecrease);
                        itemActive.set("radius", itemActive.radius - valueDecrease);
                    }
                    itemActive.set("strokeWidth", +e.target.value);
                    canvas.renderAll();
                }} defaultValue={itemActive?.strokeWidth} />
            </>;
        }
        return <></>;
    };


    const handleDrawingMode = () => {

        if (!canvas.isDrawingMode) {
            const pencil = new fabric.PencilBrush(canvas);
            dispatch(actSetObjActive(null));
            handleDiscardActive();
            canvas.freeDrawingBrush = pencil;
            canvas.freeDrawingBrush.width = 10;

            canvas.isDrawingMode = true;
            setIsPen(true);
        }
    };

    const handleRenderToolLine = () => {
        if (itemActive?.name === "line") {
            return <>
                <span>Background {itemActive.name}  </span>
                <input type="color" onChange={(e) => {
                    itemActive.set("stroke", e.target.value);
                    canvas.renderAll();
                }} defaultValue={itemActive?.stroke} />
            </>;
        }
        return <></>;
    };

    const handleRenderToolText = () => {
        if (itemActive?.name === "text") {
            return <>
                <span>color {itemActive.name}  </span>
                <input type="color" onChange={(e) => {
                    itemActive.set("fill", e.target.value);
                    canvas.renderAll();
                }} defaultValue={itemActive?.fill} />
                <span>font {itemActive.name}  </span>

                <select defaultValue={itemActive.fontFamily} onChange={(e) => {
                    itemActive.fontFamily = e.target.value;
                    canvas.renderAll();
                }}>
                    <option value="Times New Roman">Times</option>
                    <option value="'Syne Tactile', cursive">Syne Tactile </option>
                    <option value="Arial">Arial</option>

                </select>
            </>;
        }
    };

    return (
        <div className="tool">
            <div className="tool-item">
                <span>Background </span><input type="color" onChange={(e) => {

                    canvas.backgroundColor = e.target.value;
                    canvas.renderAll();
                }} />
                <button onClick={handleDrawingMode}>Pen</button>
                {isPen ? <button onClick={() => {
                    setIsPen(false);
                    canvas.isDrawingMode = false;
                }}>Cancel Pen</button> : ""}

            </div>

            <div className="tool-item">
                <button onClick={() => {
                    const itext = new fabric.IText('Write here', {
                        left: 100,
                        top: 150,
                        fill: '#ffffff',
                        strokeWidth: 2,
                        name: "text"
                    });

                    canvas.add(itext).setActiveObject(itext);
                    dispatch(actSetObjActive(itext));
                    dispatch(actSetListObj(canvas.getObjects()));

                }}>New text</button>

                <button onClick={handleDeleteAll}>Delete All</button>
                {itemActive ? <><button onClick={handleRemove}>Delete One</button>
                    <button onClick={handleDiscardActive}>Discard Active</button></> : ""}
                {handleRenderToolGeometry()}

                {handleRenderToolGeometryBorder()}
                {handleRenderToolLine()}
                {handleRenderToolText()}

            </div>
            {itemActive && <>
                <div>
                    opacity
                    <input defaultValue={itemActive.opacity * 100} min={0} max={100} type="range" onChange={(e) => {
                        itemActive.set("opacity", e.target.value / 100);
                        canvas.renderAll();
                    }} />
                </div>
            </>}
        </div >
    );
}
