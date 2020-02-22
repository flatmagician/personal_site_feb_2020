import React from 'react'

export default function OutText(props) {
    return (
        <div className={props.clicked ? "text clickedText" : "text unclickedText"}>
            {props.text}
        </div>
    )
}