export const GET_FLIGHT = 'GET_FLIGHT';
export const GET_FLIGHT_ERROR = 'GET_FLIGHT_ERROR';
export const GET_FLIGHT_SUCCESS = 'GET_FLIGHT_SUCCESS';

export const GET_FLIGHT_ERROR_2 = 'GET_FLIGHT_ERROR_2';
export const GET_FLIGHT_SUCCESS_2 = 'GET_FLIGHT_SUCCESS_2';

export const GET_FLIGHT_ERROR_3 = 'GET_FLIGHT_ERROR_3';
export const GET_FLIGHT_SUCCESS_3 = 'GET_FLIGHT_SUCCESS_3';


export function getFlight() {
  return {
    type: GET_FLIGHT,
  };
}
