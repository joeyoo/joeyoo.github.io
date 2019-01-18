import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './0_config/serviceWorker';
import './index.css';

import Router from './Router';

ReactDOM.render(<Router/>, document.getElementById('root'));

serviceWorker.unregister();
