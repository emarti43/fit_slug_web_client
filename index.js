import React from 'react';
import ReactDOM from 'react-dom';
// main app
import App from './containers/App';

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
 }
);

ReactDOM.render(<App/>, document.getElementById('app'));
