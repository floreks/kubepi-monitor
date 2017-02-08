export const DHT11_RECEIVE_DATA = 'DHT11_RECEIVE_DATA'
export const DHT11_FETCHING_DATA = 'DHT11_FETCHING_DATA'
export const DHT11_RESET = 'DHT11_RESET'

const receiveData = (address, json) => {
  return {
    type: DHT11_RECEIVE_DATA,
    address,
    payload: json
  }
}

const fetchingData = () => {
  return {
    type: DHT11_FETCHING_DATA,
  }
}

export const fetchData = address => dispatch => {
  dispatch(fetchingData())
  return fetch(address)
      .then(response => response.json())
      .then(json => dispatch(receiveData(address, json)))
}

export const reset = () => ({
  type: DHT11_RESET
})