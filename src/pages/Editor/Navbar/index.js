import { Button, DatePicker } from 'antd';
import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    PlusSquareOutlined,
    FileImageOutlined
} from '@ant-design/icons';
import "./style.scss";
import { fabric } from "fabric";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actSetListObj, actSetObjActive } from '../../../redux/actions/editor';
import Square from './Square';
import Triangle from './Triangle';
import Circle from './Circle';
import Line from './Line';
import CircleBorder from './CircleBorder';


const data = require("../../../data/img-data.json");

export default function Navbar() {
    const array = Array.from(new Set(data));
    const dispatch = useDispatch();
    const { canvas } = useSelector(state => state.editorReducer);
    const [type, setType] = useState("image");
    return (
        <div className='navbar'>
            <div className="menu">

                <Menu
                    defaultSelectedKeys={['1']}
                    theme="dark"
                    inlineCollapsed={true}
                >
                    <Menu.Item onClick={() => {
                        setType("image");
                    }} key="1" icon={<FileImageOutlined />}>
                        <p>Image</p>
                    </Menu.Item>
                    <Menu.Item onClick={() => {
                        setType("geometry");

                    }} key="2" icon={<PlusSquareOutlined />}>
                        <p>Geometry</p>
                    </Menu.Item>
                </Menu>

                {type === "image" ? (<div className="list-image">
                    {array?.map((item, index) => {
                        return <div key={index} className="item">
                            <img onClick={() => {
                                fabric.Image.fromURL(item, function (img) {
                                    img.crossOrigin = "anonymous";
                                    if (img.width >= 1500) {
                                        img.scale(0.2);
                                    } else if (img.width >= 800) {
                                        img.scale(0.3);
                                    } else if (img.width >= 600) {
                                        img.scale(0.4);
                                    } else if (img.width >= 400) {
                                        img.scale(0.6);
                                    } else if (img.width >= 300) {
                                        img.scale(0.7);
                                    }

                                    canvas.add(img).setActiveObject(img);


                                    dispatch(actSetObjActive(img));
                                    img.on("mouseup", () => {
                                        if (!canvas.isDrawingMode) {
                                            dispatch(actSetObjActive(img));
                                        }
                                    });
                                    canvas.isDrawingMode = false;

                                    dispatch(actSetListObj(canvas.getObjects()));
                                }.bind(this), {
                                    crossOrigin: 'anonymous'
                                });
                            }} src={item} alt={item} />
                        </div>;
                    })
                    }
                </div>) : <div className="list-geometry">
                    <Square />
                    <Circle />
                    <CircleBorder />
                    <Triangle />
                    <Line />
                </div>}
            </div>
        </div>
    );
}
