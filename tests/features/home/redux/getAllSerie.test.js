import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_ALL_SERIE_BEGIN,
  HOME_GET_ALL_SERIE_SUCCESS,
  HOME_GET_ALL_SERIE_FAILURE,
  HOME_GET_ALL_SERIE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getAllSerie,
  dismissGetAllSerieError,
  reducer,
} from '../../../../src/features/home/redux/getAllSerie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getAllSerie', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAllSerie succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAllSerie())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ALL_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ALL_SERIE_SUCCESS);
      });
  });

  it('dispatches failure action when getAllSerie fails', () => {
    const store = mockStore({});

    return store.dispatch(getAllSerie({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ALL_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ALL_SERIE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetAllSerieError', () => {
    const expectedAction = {
      type: HOME_GET_ALL_SERIE_DISMISS_ERROR,
    };
    expect(dismissGetAllSerieError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_ALL_SERIE_BEGIN correctly', () => {
    const prevState = { getAllSeriePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_ALL_SERIE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllSeriePending).toBe(true);
  });

  it('handles action type HOME_GET_ALL_SERIE_SUCCESS correctly', () => {
    const prevState = { getAllSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ALL_SERIE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllSeriePending).toBe(false);
  });

  it('handles action type HOME_GET_ALL_SERIE_FAILURE correctly', () => {
    const prevState = { getAllSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ALL_SERIE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllSeriePending).toBe(false);
    expect(state.getAllSerieError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_ALL_SERIE_DISMISS_ERROR correctly', () => {
    const prevState = { getAllSerieError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_ALL_SERIE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAllSerieError).toBe(null);
  });
});

