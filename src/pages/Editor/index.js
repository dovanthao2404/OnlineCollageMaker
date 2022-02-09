import React from 'react';
import Index from './Index/index';
import Main from './Main/index';
import Navbar from './Navbar';
import "./style.scss";
export default function Editor() {
    return (
        <div className="editor">
            <Navbar />
            <Main />
            <Index />
        </div>
    );
}
