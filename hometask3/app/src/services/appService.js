import { pipe, reduce } from '../functions/index.js';

const appDispatcher = (uiDispatcher, actionDispatcher) => (actions, store) => {
    const dispatch = (state) => uiDispatcher(state, actionDispatcher(actions)(dispatch)(state));

    return dispatch(store);
};

const actionDispatcher = (actions) => (dispatch) => (state) => reduce(actions, (result, action, actionName) => ({
    ...result,
    [actionName]: pipe(
        action(state),
        dispatch
    )
}), {});

const getUiDispatcher = (domService, render) => (root) => (store, actions) => {
    root.innerHTML = "";

    return domService.appendChildren(
        root,
        render(domService)(
            store,
            actions
        )
    );
};


export default {
    appDispatcher,
    actionDispatcher,
    getUiDispatcher
};
