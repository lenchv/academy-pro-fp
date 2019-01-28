import pages from './pages/index.js';
import routes from './routes.js';

const onChangeRoute = (historyService) => (actions) => {
    historyService.onChangeRoute(actions.changeRoute)
};

const render = (domService, historyService) => (state, actions) => {
    onChangeRoute(historyService)(actions);

    return routes(
        pages(domService, historyService)
    )(
        state.get('currentRoute')
    )(state, actions);
};

export default render;
