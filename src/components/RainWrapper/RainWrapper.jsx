import React from 'react'
import withWindowDimensions from '../withWindowDimensions/withWindowDimensions'
import Rain from '../Rain/Rain'

function RainWrapper(props) {
    return (
        (props.windowWidth < 200) ?
            null
            :
            <Rain
                columns={props.columns}
                id={props.id}
                windowWidth={props.windowWidth}
                windowHeight={props.windowHeight}
                direction={props.direction}
                colors={props.colors}
            />
    )
}

export default withWindowDimensions(RainWrapper)
