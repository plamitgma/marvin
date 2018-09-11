import SagaTester from 'redux-saga-tester';
import {
  FETCH_FORK,
  FETCH_RACE,
  fetchFork,
  fetchRace,
} from '../../actions/effect';

import EffectSaga from '../effect';

describe('URP Saga Test', () => {
  let sagaTester = null;

  beforeEach(() => {
    // Init code
    sagaTester = new SagaTester({});
    sagaTester.start(EffectSaga());
  });

  it('Effect Saga intercepts dispatched FETCH_FORK action', async () => {
    sagaTester.dispatch(fetchFork());
    const listOfFiredActions = sagaTester.getCalledActions();
    expect(listOfFiredActions[0].type).toBe(FETCH_FORK);
  });

  it('Effect Saga intercepts dispatched FETCH_RACE action', async () => {
    sagaTester.dispatch(fetchRace());
    const listOfFiredActions = sagaTester.getCalledActions();
    expect(listOfFiredActions[0].type).toBe(FETCH_RACE);
  });
});
