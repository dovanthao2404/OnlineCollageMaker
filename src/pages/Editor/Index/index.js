import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Item from './Item';

import "./style.scss";

export default function Index() {
    const { canvas, listItem } = useSelector(state => state.editorReducer);

    const downloadImage = () => {
        const ext = "png";
        const base64 = canvas.toDataURL({
            format: ext,
            enableRetinaScaling: true
        });
        const link = document.createElement("a");
        link.href = base64;
        link.download = `your-beautiful.${ext}`;
        link.click();
    };
    console.log(listItem);


    return (
        <div className="index" >
            <button onClick={downloadImage}>Download</button>
            <div className="z-index">
                {
                    listItem?.map((objItem, key) => {
                        return <Item key={key} item={objItem} />;
                    })}
            </div>
        </div>
    );
}
