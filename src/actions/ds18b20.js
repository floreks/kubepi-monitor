export const DS18B20_RECEIVE_DATA = 'DS18B20_RECEIVE_DATA'
export const DS18B20_FETCHING_DATA = 'DS18B20_FETCHING_DATA'
export const DS18B20_RESET = 'DS18B20_RESET'

const receiveData = (address, json) => {
  return {
    type: DS18B20_RECEIVE_DATA,
    address,
    payload: json
  }
}

const fetchingData = () => {
  return {
    type: DS18B20_FETCHING_DATA,
  }
}

export const fetchData = address => dispatch => {
  dispatch(fetchingData())
  return fetch(address)
      .then(response => response.json())
      .then(json => dispatch(receiveData(address, json)))
}

export const reset = () => ({
  type: DS18B20_RESET
})