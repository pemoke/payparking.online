/* eslint-disable no-undef */

function getParkingMeters(success) {
  return fetch('/api/meters', {
    headers: {
      Accept: 'application/json'
    },
  }).then(checkStatus)
      .then(parseJSON)
      .then(success);
}

function getParkingBays(success, meter) {
  return fetch('/api/bays/' + meter, {
    headers: {
      Accept: 'application/json'
    },
  }).then(checkStatus)
      .then(parseJSON)
      .then(success);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { getParkingMeters, getParkingBays };
export default Client;
