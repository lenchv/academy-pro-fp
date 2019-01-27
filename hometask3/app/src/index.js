import render from './ui/render.js';
import appService from './services/appService.js';
import rawDomService from './services/domService.js';
import rawHistoryService from './services/historyService.js';

import store from './store/index.js';
import actions from './actions/index.js';

const domService = rawDomService(document);
const historyService = rawHistoryService(window);

const uiDispatcher = appService.getUiDispatcher(
    domService,
    render(domService, historyService)
)(document.getElementById('root'));

const { actionDispatcher } = appService;

appService.appDispatcher(
    uiDispatcher, actionDispatcher 
)(actions, store(historyService));
