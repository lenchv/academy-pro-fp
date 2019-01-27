import render from './ui/render.js';
import domService from './services/domService.js';
import appService from './services/appService.js';

import store from './store/index.js';
import actions from './actions/index.js';

const uiDispatcher = appService.getUiDispatcher(
    domService(document),
    render
)(document.getElementById('root'));

const { actionDispatcher } = appService;

appService.appDispatcher(
    uiDispatcher, actionDispatcher 
)(actions, store);
