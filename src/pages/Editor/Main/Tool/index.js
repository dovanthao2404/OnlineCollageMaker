import React from 'react';
import { useDispatch } from 'react-redux';
import { actChangeBGColor } from '../../../../redux/actions/editor';

export default function Tool() {
    const dispatch = useDispatch();

    // const {}

    return (
        <div className="tool">
            BG Color<input type="color" onChange={(e) => {
                dispatch(actChangeBGColor(e.target.value));
            }} defaultValue="#ffff" />

        </div>
    );
}
