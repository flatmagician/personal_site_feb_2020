import React, { useState } from 'react'
import OutText from '../OutText/OutText'

import './Out.css'

export default function Out(props) {
    const [darkStyle, setDarkStyle] = useState(false)
    const mouseDownHandler = props.active ? () => mouseDown(setDarkStyle) : null
    const mouseUpHandler = props.active ? () => mouseUp(setDarkStyle, props) : null
    return (
        <div className={darkStyle ? "Out clicked" : "Out unclicked"}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            style={{ 'width': props.width, 'height': props.height }}
        >
            <div className="inner" style={props.filterOff ? { filter: "none", color: 'rgb(' + props.colors.textColor.toString() + ")" } : { color: 'rgb(' + props.colors.textColor.toString() + ")" }}>
                {props.inner ?
                    props.inner
                    :
                    <OutText
                        text={props.text}
                        clicked={darkStyle}
                    />
                }
            </div>
        </ div >
    )
}

function mouseDown(setDarkStyle) {
    setDarkStyle(true)
}

function mouseUp(setDarkStyle, props) {
    setTimeout(() => {
        setDarkStyle(false)
        props.update()
    }, 150)
}
