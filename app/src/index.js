import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './App.css'

import App from './App.js'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
