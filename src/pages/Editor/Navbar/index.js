import { Button, DatePicker } from 'antd';
import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    DesktopOutlined,
    FileImageOutlined
} from '@ant-design/icons';
import "./style.scss";
import { fabric } from "fabric";
import { useSelector } from 'react-redux';
const { SubMenu } = Menu;

const data = require("../../../data/img-data.json");

export default function Navbar() {
    const array = Array.from(new Set(data));
    const { canvas } = useSelector(state => state.editorReducer);
    return (
        <div className='navbar'>
            <div className="menu">

                <Menu
                    defaultSelectedKeys={['1']}
                    theme="dark"
                    inlineCollapsed={true}
                >
                    <Menu.Item key="1" icon={<FileImageOutlined />}>
                        <p>Image</p>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <p>geometry</p>
                    </Menu.Item>
                </Menu>
                <div className="list-image">
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
                                }.bind(this), {
                                    crossOrigin: 'anonymous'
                                });
                            }} src={item} alt={item} />
                        </div>;
                    })
                    }
                </div>
            </div>
        </div>
    );
}
