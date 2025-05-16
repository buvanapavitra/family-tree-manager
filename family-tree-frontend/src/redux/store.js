import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import memberReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(memberReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
