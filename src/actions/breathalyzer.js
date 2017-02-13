export const BREATHALYZER_RECEIVE_DATA = 'BREATHALYZER_RECEIVE_DATA'
export const BREATHALYZER_FETCHING_DATA = 'BREATHALYZER_FETCHING_DATA'
export const BREATHALYZER_RESET = 'BREATHALYZER_RESET'

const receiveData = (address, json) => {
  return {
    type: BREATHALYZER_RECEIVE_DATA,
    address,
    payload: json
  }
}

const fetchingData = () => {
  return {
    type: BREATHALYZER_FETCHING_DATA,
  }
}

export const fetchData = address => dispatch => {
  dispatch(fetchingData())
  return fetch(address)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveData(address, json))
      })
}

export const reset = () => ({
  type: BREATHALYZER_RESET
})
