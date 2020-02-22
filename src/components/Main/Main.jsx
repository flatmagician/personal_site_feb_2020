import React, { Component } from 'react'
import Out from '../Out/Out'
import Home from '../Home/Home'

import './Main.css'

export default class Main extends Component {
    render() {
        return (
            <div className="Main">
                <div className="contentContainer">
                    <Out
                        active={false}
                        width="90%"
                        height="100%"
                        inner={
                            <div style={{ display: "flex" }}>
                                {this.props.page === "home" ?
                                    <Home
                                        windowWidth={this.props.windowWidth}
                                        windowHeight={this.props.windowHeight}
                                    />
                                    :
                                    null}

                                {this.props.page === "page2" ?
                                    <div>lolol</div> : null}

                            </div>
                        }
                    />
                </div>
                <div className="buttonContainer">
                    <Out
                        active={true}
                        width="30%"
                        height="50px"
                        text={<h5><span className="bigChar">H</span>OME</h5>}
                        update={() => this.props.update('home')}

                    />
                    <Out
                        active={true}
                        width="30%"
                        height="50px"
                        text={
                            <h5>PAGE</h5>
                        }
                        update={() => this.props.update('page2')}
                    />
                    <Out
                        active={true}
                        width="30%"
                        height="50px"
                        text={
                            <h5>PROJECTS</h5>
                        }
                        update={() => this.props.update('page3')}
                    />
                </div>
            </div>
        )
    }
}
