import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './components/Main/Main'
import RainWrapper from './components/RainWrapper/RainWrapper'
import Out from './components/Out/Out'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobileSize: null,
      isMobileSized: null,
      width: 0,
      height: 0,
      page: "home",
      direction1: "down",
      direction2: "down",
      colors: {
        gradientLight: [255, 174, 202],
        gradientDark: [253, 185, 208],
        textColor: [113, 161, 224]
      }
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updatePage(page) {
    let direction1 = "down"
    let direction2 = "down"
    let gradientLight = [255, 174, 202]
    let gradientDark = [253, 185, 208]
    let textColor = [113, 161, 224]
    if (page === "page2") {
      direction1 = "right"
      direction2 = "left"
      gradientLight = [253, 135, 143]
      gradientDark = [250, 165, 173]
      // textColor = [199, 207, 233]
      textColor = [245, 235, 202]
    }
    if (page === "page3") {
      direction1 = "up"
      direction2 = "up"
      gradientLight = [205, 185, 246]
      gradientDark = [255, 205, 245]
      textColor = [64, 204, 181]
    }
    this.setState({
      page,
      direction1,
      direction2,
      colors: {
        gradientLight,
        gradientDark,
        textColor
      }
    })
  }

  render() {
    return (
      <div className="App" style={{ color: "black", backgroundImage: "linear-gradient(to top, rgb(" + this.state.colors.gradientDark.toString() + "), rgb(" + this.state.colors.gradientLight.toString() + ")" }}>
        {(this.state.width > 745 && this.state.height > 500) ?
          <div className="rainWrapper" style={{ "marginLeft": "30px" }}>
            <Out
              inner={
                <RainWrapper
                  columns={10}
                  id="rain1"
                  direction={this.state.direction1}
                  colors={this.state.colors}
                />
              }
              height="100%"
              width="100%"
              filterOff={true}
              colors={this.state.colors}
            />
          </div>
          :
          null
        }
        <Main
          windowHeight={this.state.windowHeight}
          windowWidth={this.state.windowWidth}
          update={this.updatePage}
          page={this.state.page}
          colors={this.state.colors}
        />

        {this.state.width > 875 ?
          <div className="rainWrapper" style={{ "margin-right": "30px" }}>
            <Out
              inner={
                <RainWrapper
                  columns={10}
                  id="rain2"
                  direction={this.state.direction2}
                  colors={this.state.colors}
                />
              }
              height="100%"
              width="100%"
              filterOff={true}
              colors={this.state.colors}
            />
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default App;
