import React from 'react';
import Tool from './Tool';
import "./style.scss";
import Photo from './Photo';
export default function Main() {
    return (
        <div className='main'>
            <Tool />
            <Photo />
        </div>
    );
}
