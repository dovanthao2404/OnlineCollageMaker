import { Button, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
    PlusSquareOutlined,
    FileImageOutlined,
    PlusOutlined
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


export default function Navbar() {

    const [data, setData] = useState();

    useEffect(() => {
        ; (async () => {
            const url = "https://raw.githubusercontent.com/dovanthao2404/test/master/data.json";

            const res = await fetch(url);
            const data = await res.json();
            setData(data);
        })();

    }, []);

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
                    <div className='item'>
                        <label htmlFor="file-image">
                            <PlusOutlined style={{
                                fontSize: 100,
                                cursor: "pointer"
                            }} />
                            <p>Add Image</p>
                        </label>
                        <input style={{ display: "none" }} type="file" id='file-image' onChange={async (e) => {
                            const { files } = e.target;
                            const file = files[0];
                            if (file?.type.includes("image")) {
                                const reader = new FileReader();
                                await reader.readAsDataURL(file);
                                reader.onload = (e) => {
                                    const dataTemp = [e.target.result, ...data];
                                    setData(dataTemp);
                                };
                            }
                        }} />
                    </div>
                    {data?.map((item, index) => {
                        return <div key={index} className="item">
                            <img loading="lazy" onError={(e) => {
                                e.target.src = "https://wpklik.com/wp-content/uploads/2019/03/A-404-Page-Best-Practices-and-Design-Inspiration.jpg";

                            }} onClick={() => {
                                fabric.Image.fromURL(item, function (img) {
                                    img.crossOrigin = "anonymous";
                                    if (img.width >= 2500) {
                                        console.log("run");
                                        img.scale(0.01);
                                    } else if (img.width >= 1500) {
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
