import React, { Component } from 'react'
import './Home.css'



export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            to_draw: true,
            string: `
    .           ..         .           .       .           .           .
    .         .            .          .       .
            .         ..xxxxxxxxxx....               .       .             .
    .             MWMWMWWMWMWMWMWMWMWMWMWMW                       .
            IIIIMWMWMWMWMWMWMWMWMWMWMWMWMWMttii:        .           .
.      IIYVVXMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWxx...         .           .
    IWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMx..
    IIWMWMWMWMWMWMWMWMWMW%WMWM%MWM%MWMWMWMWMWMWMWMWMWMWMWMWMWMWMx..        .
    ""MWMWMWMWMWM"""""""".  .:..   ."""""MWMWMWMWMWMWMWMWMWMWMWMWMWti.
.     ""   . \`  .: . :. : .  . :.  .  . . .  """"MWMWMWMWMWMWMWMWMWMWMWMWMti=
        . .   :\` . :   .  .'.' '....xxxxx...,'. '   ' ."""YWMWMWMWMWMWMWMWMWMW+
    ; . \` .  . : . .' :  . ..XXXXXXXXXXXXXXXXXXXXx.    \`     . "YWMWMWMWMWMWMW
.    .  .  .    . .   .  ..XXXXXXXXWWWWWWWWWWWWWWWWXXXX.  .     .     """""""
        ' :  : . : .  ...XXXXXWWW"   W88N88@888888WWWWWXX.   .   .       . .
    . ' .    . :   ...XXXXXXWWW"    M88N88GGGGGG888^8M "WMBX.          .   ..  :
          :     ..XXXXXXXXWWW"     M88888WWRWWWMW8oo88M   WWMX.     .    :    .
           "XXXXXXXXXXXXWW"       WN8888WWWWW  W8@@@8M    BMBRX.         .  : :
  .       XXXXXXXX=MMWW":  .      W8N888WWWWWWWW88888W      XRBRXX.  .       .
     ....  ""XXXXXMM::::. .        W8@889WWWWWM8@8N8W      . . :RRXx.    .
          \`\`...'''  MMM::.:.  .      W888N89999888@8W      . . ::::"RXV    .  :
.        ..'''''      MMMm::.  .      WW888N88888WW     .  . mmMMMMMRXx
      ..' .            ""MMmm .  .       WWWWWWW   . :. :,miMM"""  : ""\`    .
    .                .       ""MMMMmm . .  .  .   ._,mMMMM"""  :  ' .  :
                .                  ""MMMMMMMMMMMMM""" .  : . '   .        .
        .              .     .    .                      .         .
.                                         .          .         .
    `.split("!")
        }
        this.ascii = this.ascii.bind(this)
    }

    ascii() {
        let stringInfo = this.state.string.map(line => {
            let n_spaces = 0
            let n_dots = 0
            let indices = []

            let line_chars = line.split("")

            line_chars.forEach((char, index) => {
                if (char === " ") {
                    n_spaces += 1
                    indices.push(index)
                }
                if (char === ".") {
                    n_dots += 1
                    indices.push(index)
                }
            })
            return {
                n_spaces,
                n_dots,
                n_slots: n_spaces + n_dots,
                indices,
                line,
                line_chars
            }
        })

        let out = stringInfo.map(lineInfo => {
            let {
                n_spaces,
                n_dots,
                n_slots,
                indices,
                line,
                line_chars
            } = lineInfo

            //create and shuffle slots
            let slots = new Array(n_slots)
            for (let i = 0; i < n_slots; i++) {
                slots[i] = line_chars[indices[i]]
            }

            for (let i = 0; i < n_slots; i++) {
                let swpi = i + Math.floor(Math.random() * (n_slots - i));
                // now swap elements at i and swpi
                if (Math.random() > .95) {
                    var tmp = slots[i];
                    slots[i] = slots[swpi];
                    slots[swpi] = tmp;
                }

            }

            let char_array = new Array(line.length)

            let slot_index = 0
            for (let i = 0; i < line.length; i++) {
                const char = line_chars[i]
                if (char === " " || char === ".") {
                    char_array[i] = slots[[slot_index]]
                    slot_index++
                }
                else {
                    char_array[i] = line_chars[i]
                }
            }
            return char_array.join("")
        })
        this.setState({
            string: out
        })
        setTimeout(this.ascii, 30)
    }
    componentDidMount() {
        this.ascii()
    }
    componentDidUpdate() {
        if (this.props.windowHeight > 500 && this.state.to_draw === false) {
            this.setState({
                to_draw: true
            })
        }
        if (this.props.windowHeight < 500 && this.state.to_draw === true) {
            this.setState({
                to_draw: true
            })
        }
    }

    render() {
        return (
            <div className="Home">
                <h1 className="unclickedText"><span className="bigChar">B</span>EN <span className="bigChar">T</span>AUSSIG</h1>

                {this.state.to_draw ?
                    <div className="ascii unclickedText">{
                        this.state.string
                    }
                    </div>
                    :
                    null
                }

                <h4 className="description unclickedText">
                    • Full-Stack Web Developer
                <br /><br />
                    • Software Engineer
                <br /><br />
                    • Electrical Engineer
            </h4>
            </div>
        )
    }
}