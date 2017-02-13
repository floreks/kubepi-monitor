import {combineReducers} from 'redux';
import * as dht11 from '../actions/dht11'
import * as ds18b20 from '../actions/ds18b20'
import * as breathalyzer from '../actions/breathalyzer'

export const Statuses = {
  off: 'Off',
  polling: 'Polling...',
  breathalyzerOn: 'Breathe into sensor for 5 sec...',
  polled: 'Done'
}

const dht11State = (state = {
  isFetching: false,
  status: Statuses.off,
  payload: undefined
}, action) => {
  switch (action.type) {
    case dht11.DHT11_RECEIVE_DATA:
      if (state.status === Statuses.off) {
        return {
          isFetching: false,
          status: Statuses.off,
          payload: undefined
        }
      }

      return {
        isFetching: false,
        status: Statuses.polled,
        payload: action.payload
      }
    case dht11.DHT11_FETCHING_DATA:
      return {
        isFetching: true,
        status: Statuses.polling,
        payload: state.payload
      }
    case dht11.DHT11_RESET:
      return {
        isFetching: false,
        status: Statuses.off,
        payload: undefined
      }
    default:
      return state
  }
}

const ds18B20State = (state = {
  isFetching: false,
  status: Statuses.off,
  payload: undefined
}, action) => {
  switch (action.type) {
    case ds18b20.DS18B20_RECEIVE_DATA:
      if (state.status === Statuses.off) {
        return {
          isFetching: false,
          status: Statuses.off,
          payload: undefined
        }
      }

      return {
        isFetching: false,
        status: Statuses.polled,
        payload: action.payload
      }
    case ds18b20.DS18B20_FETCHING_DATA:
      return {
        isFetching: true,
        status: Statuses.polling,
        payload: state.payload
      }
    case ds18b20.DS18B20_RESET:
      return {
        isFetching: false,
        status: Statuses.off,
        payload: undefined
      }
    default:
      return state
  }
}

const breathalyzerState = (state = {
  isFetching: false,
  status: Statuses.off,
  payload: undefined
}, action) => {
  switch (action.type) {
    case breathalyzer.BREATHALYZER_RECEIVE_DATA:
      if (state.status === Statuses.off) {
        return {
          isFetching: false,
          status: Statuses.off,
          payload: undefined
        }
      }

      return {
        isFetching: false,
        status: Statuses.polled,
        payload: action.payload
      }
    case breathalyzer.BREATHALYZER_FETCHING_DATA:
      return {
        isFetching: true,
        status: Statuses.breathalyzerOn,
        payload: state.payload
      }
    case breathalyzer.BREATHALYZER_RESET:
      return {
        isFetching: false,
        status: Statuses.off,
        payload: undefined
      }
    default:
      return state
  }
}

/**
 * combineReducers is important to understand. As your app might grow in size
 * and complexity, you will likely begin to split your reducers into separate
 * functions - with each one managing a separate slice of the state! This helper
 * function from 'redux' simply merges the reducers. Keep in mind we are using
 * the ES6 shorthand for property notation.
 *
 * If you're transitioning from Flux, you will notice we only use one store, but
 * instead of relying on multiple stores to manage diff parts of the state, we use
 * various reducers and combine them.
 *
 * More info: http://rackt.org/redux/docs/api/combineReducers.html
 */
const rootReducer = combineReducers({
  dht11State, ds18B20State, breathalyzerState // you might be used to: counter: counter,
});

export default rootReducer;
