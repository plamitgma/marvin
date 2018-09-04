export const FETCH_RACE = 'FETCH_RACE';
export const FETCH_FORK = 'FETCH_FORK';


export function fetchRace() {
  return {
    type: FETCH_RACE,
  };
}

export function fetchFork() {
  return {
    type: FETCH_FORK,
  };
}
