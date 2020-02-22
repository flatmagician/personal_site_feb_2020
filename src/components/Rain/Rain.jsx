import React, { Component } from 'react'
import './Rain.css'

export default class Rain extends Component {
    constructor(props) {
        super(props)
        // this.alphabet = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑".split("")
        // this.alphabet = "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя".split("") + this.alphabet
        this.alphabet = `!"$&'()*+,./0123456789:;?{}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
        // + this.alphabet
        this.ref = React.createRef()
        this.fontSize = 25
        this.state = {
            drops: [],
            ctx: null,
            windowWidth: props.windowWidth,
            windowHeight: props.windowHeight,
            columns: 10,
            rows: 10,
            direction: this.props.direction,
            colors: {
                gradientLight: [255, 174, 202],
                gradientDark: [253, 185, 208],
                textColor: [113, 161, 224]
            }
        }
        this.draw = this.draw.bind(this)
        this.initDrops = this.initDrops.bind(this)
    }

    componentDidUpdate() {
        if (this.props.colors && this.state.colors !== this.props.colors) {
            console.log('COLORS')
            console.log(this.props.colors)
            this.setState({
                colors: this.props.colors
            })
        }
    }

    componentDidMount() {
        this.initDrops()
        this.ctx = this.ref.current.getContext('2d')
        this.draw()
    }

    initDrops() {
        let drops = []
        let columns = this.props.windowWidth !== 0 ? this.props.windowWidth / (this.fontSize) : this.fontSize
        columns = Math.floor(columns)
        let rows = this.props.windowHeight !== 0 ? this.props.windowHeight / this.fontSize : this.fontSize
        rows = Math.floor(rows) + 1

        if (this.props.direction === "up" || this.props.direction === "down") {
            if (this.state.drops.length !== columns) {
                for (let x = 0; x < columns; x++) {
                    drops[x] = Math.floor(Math.random() * this.props.windowHeight);
                }
                this.setState({
                    drops,
                    windowHeight: this.props.windowHeight,
                    windowWidth: this.props.windowWidth / 4,
                    columns,
                    rows,
                    direction: this.props.direction
                })
            }
        }
        if (this.props.direction === "left" || this.props.direction === "right") {
            if (this.state.drops.length !== rows) {
                for (let x = 0; x < rows; x++) {
                    drops[x] = Math.floor(Math.random() * this.props.windowHeight);
                }
                this.setState({
                    drops,
                    windowHeight: this.props.windowHeight,
                    windowWidth: this.props.windowWidth / 4,
                    columns,
                    rows,
                    direction: this.props.direction
                })
            }
        }
    }

    draw() {
        if (this.props.windowWidth !== this.state.windowWidth || this.props.direction !== this.state.direction) {
            this.initDrops()
        }
        // this.ctx.fillStyle = "linear-gradient(to top, rgb(253, 185, 208), rgb(255, 174, 202)";
        let gradient = this.ctx.createLinearGradient(0, 0, 0, 1 * this.props.windowHeight)
        gradient.addColorStop(0, "rgba(" + this.state.colors.gradientLight.toString() + ", .18)")
        gradient.addColorStop(1, "rgba(" + this.state.colors.gradientDark.toString() + ", .75)")
        this.ctx.fillStyle = gradient
        this.ctx.fillRect(0, 0, this.state.windowWidth, this.state.windowHeight);

        this.ctx.fillStyle = "rgb(" + this.state.colors.textColor.toString() + ")";
        this.ctx.font = this.fontSize + "px bd-eject";

        let drops = JSON.parse(JSON.stringify(this.state.drops))
        for (let i = 0; i < this.state.drops.length; i++) {
            // select char
            let text = this.alphabet[Math.floor(Math.random() * this.alphabet.length)]

            // draw char
            switch (this.props.direction) {
                // down is default
                default:
                    this.ctx.fillText(text, i * this.fontSize, drops[i] * this.fontSize, this.fontSize - 1)

                    if (drops[i] > this.props.windowHeight / this.fontSize && Math.random() > 0.95) {
                        drops[i] = 0;
                    }
                    drops[i] += 1
                    break;
                case "down":
                    this.ctx.fillText(text, i * this.fontSize, drops[i] * this.fontSize, this.fontSize - 1)

                    if (drops[i] > this.props.windowHeight / this.fontSize && Math.random() > 0.9) {
                        drops[i] = 0;
                    }
                    drops[i] += 1
                    break;
                case "up":
                    this.ctx.fillText(text, i * this.fontSize, ((this.props.windowHeight / this.fontSize) - drops[i] + 1) * this.fontSize, this.fontSize - 1)

                    if (drops[i] > this.props.windowHeight / this.fontSize && Math.random() > 0.9) {
                        drops[i] = 0;
                    }
                    drops[i] += 1
                    break;
                case "right":
                    this.ctx.fillText(text, (drops[i] - 1) * this.fontSize, i * this.fontSize, this.fontSize - 1)

                    if (drops[i] > this.state.windowWidth / this.fontSize && Math.random() > 0.9) {
                        drops[i] = 0;
                    }
                    drops[i] += 1
                    break;

                case "left":
                    this.ctx.fillText(text, ((this.state.windowWidth / this.fontSize) - drops[i] + 1) * this.fontSize, i * this.fontSize, this.fontSize - 1)

                    if (drops[i] > this.state.windowWidth / this.fontSize && Math.random() > 0.9) {
                        drops[i] = 0;
                    }
                    drops[i] += 1
                    break;
            }

        }
        this.setState({
            drops: drops
        })
        setTimeout(this.draw, 33)
    }


    render() {
        return (
            <canvas className="Rain" width={this.props.windowWidth / 4} height={this.props.windowHeight} id={this.props.id} ref={this.ref}>
            </canvas>
        )
    }
}
