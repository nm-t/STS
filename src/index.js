import React from 'react';
import { render } from 'react-dom';
import '../css/nv.d3.min.css';
import '../css/pure-min.css';
import '../css/grids-responsive-min.css';
import App from './containers/App';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

render(<App />, document.getElementById('root'));
