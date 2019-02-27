import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './redux/reducers';
import { createStore } from "redux";
import { Provider } from "react-redux";


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const store = createStore( reducers,{
    users: [{
        name: "Shriram"
    }]
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));