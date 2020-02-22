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
      direction2: "down"
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
    console.log('UPDATEING PAGE')
    console.log(page)
    let direction1 = "down"
    let direction2 = "down"
    if (page === "page2") {
      direction1 = "right"
      direction2 = "left"
    }
    if (page === "page3") {
      direction1 = "up"
      direction2 = "up"
    }
    this.setState({
      page,
      direction1,
      direction2
    })
  }

  render() {
    return (
      <div className="App" >
        {(this.state.width > 745 && this.state.height > 500) ?
          <div className="rainWrapper" style={{ "marginLeft": "30px" }}>
            <Out
              inner={
                <RainWrapper
                  columns={10}
                  id="rain1"
                  direction={this.state.direction1}
                />
              }
              height="100%"
              width="100%"
              filterOff={true}
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
        />

        {this.state.width > 875 ?
          <div className="rainWrapper" style={{ "margin-right": "30px" }}>
            <Out
              inner={
                <RainWrapper
                  columns={10}
                  id="rain2"
                  direction={this.state.direction2}
                />
              }
              height="100%"
              width="100%"
              filterOff={true}
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
