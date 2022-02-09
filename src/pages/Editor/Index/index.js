import React from 'react';
import { useSelector } from "react-redux";
export default function Index() {

    const { canvas } = useSelector(state => state.editorReducer);

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

    return (
        <div className="index" >
            <button onClick={downloadImage}>Download</button>
        </div>
    );
}
