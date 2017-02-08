import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux'

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {SensorCard} from "../components/SensorCard";
import * as dht11 from "../actions/dht11";
import * as ds18b20 from "../actions/ds18b20";
import {Statuses} from "../reducers/index";

import DHT11 from "./assets/dht11.png";
import DS18B20 from "./assets/ds18b20.png";
import MQ3 from "./assets/mq3.png";


/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
class App extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      dhtIntervalId: 0,
      ds18b20IntervalId: 0
    }
  }

  runPollInterval(fetchFn, address, timeout = 3000, immediate = true) {
    let intervalId = setInterval(() => {
      this.props.dispatch(fetchFn(address))
    }, timeout, true)

    if(immediate) {
      this.props.dispatch(fetchFn(address))
    }

    return intervalId
  }

  handleDHT11() {
    if(this.state.dhtIntervalId === 0) {
      let intervalId = this.runPollInterval(dht11.fetchData, 'http://192.168.0.100:30024/dht11')
      this.setState({
        dhtIntervalId: intervalId,
      })
    } else {
      clearInterval(this.state.dhtIntervalId)
      this.props.dispatch(dht11.reset())
      this.setState({
        dhtIntervalId: 0,
      })
    }
  }

  handleDS18B20() {
    if(this.state.ds18b20IntervalId === 0) {
      let intervalId = this.runPollInterval(ds18b20.fetchData, 'http://192.168.0.100:30024/ds18b20')
      this.setState({
        ds18b20IntervalId: intervalId,
      })
    } else {
      clearInterval(this.state.ds18b20IntervalId)
      this.props.dispatch(ds18b20.reset())
      this.setState({
        ds18b20IntervalId: 0
      })
    }
  }

  render() {
    const {dht11State, ds18B20State} = this.props

    let dht11Status = dht11State.status
    if(dht11State.status === Statuses.polled ||
        (dht11State.status === Statuses.polling && !!dht11State.payload)) {
      dht11Status = (
          <div>
            <div>Temperature: {dht11State.payload.temperature}</div>
            <div>Humidity: {dht11State.payload.humidity}</div>
          </div>
      )
    }

    let ds18B20Status = ds18B20State.status
    if(ds18B20State.status === Statuses.polled ||
        (ds18B20State.status === Statuses.polling && !!ds18B20State.payload)) {
      ds18B20Status = (
          <div>
            <div>Temperature: {ds18B20State.payload.temperature}</div>
          </div>
      )
    }

    return (
        <div className="site-container">
          <Navbar />
          <div className="main-app-container">
            <SensorCard name='DHT11 Sensor'
                        thumbnail={DHT11}
                        description="Humidity and temperature sensor with a single wire digital interface.
                        Works in temperature range: 0&#8451; to 50&#8451; and humidity range: 20-90%."
                        onAction={this.handleDHT11.bind(this)}
                        actionText={this.state.dhtIntervalId === 0 ? 'Start polling' : 'Stop polling'}
                        status={dht11Status}/>
            <SensorCard name='DS18B20 Sensor'
                        thumbnail={DS18B20}
                        description="Digital temperature sensor that communicates over a 1-Wire bus. Works in
                        temperature range: -55&#8451; to 125&#8451;."
                        onAction={this.handleDS18B20.bind(this)}
                        actionText={this.state.ds18b20IntervalId === 0 ? 'Start polling' : 'Stop polling'}
                        status={ds18B20Status}/>
            <SensorCard name='Breathalyzer'
                        thumbnail={MQ3}
                        description="Breathalyzer based on MQ-3 gas sensor.
                        Only detects alcohol in the air and does not support alcohol concentration measurement."
                        actionText="Detect alcohol"
                        status="Off"/>
          </div>
          <Footer/>
        </div>
    );
  }
}

App.propTypes = {
  dht11State: PropTypes.object.isRequired,
  ds18B20State: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    dht11State: state.dht11State,
    ds18B20State: state.ds18B20State
  }
}

export default connect(mapStateToProps)(App)