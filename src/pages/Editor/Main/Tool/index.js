import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actChangeBGColor } from '../../../../redux/actions/editor';
import { DeleteOutlined } from "@ant-design/icons";
export default function Tool() {
    const dispatch = useDispatch();

    const { canvas } = useSelector(state => state.editorReducer);


    const handleRemove = () => {
        canvas.remove(canvas.getActiveObject());
        canvas.renderAll();
    };

    return (
        <div className="tool">
            <div className="tool-item">
                <span>Background </span><input type="color" onChange={(e) => {
                    dispatch(actChangeBGColor(e.target.value));
                }} />
            </div>
            <div className="tool-item">
                <DeleteOutlined style={{ cursor: "pointer" }} onClick={handleRemove} />
            </div>
        </div>
    );
}
