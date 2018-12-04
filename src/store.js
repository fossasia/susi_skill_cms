import createStore from './redux/create';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(BrowserRouter);

export default store;
