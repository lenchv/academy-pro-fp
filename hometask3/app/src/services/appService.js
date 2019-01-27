import { pipe, reduce } from '../functions/index.js';

const appDispatcher = (uiDispatcher, actionDispatcher) => (actions, store) => {
    const dispatch = (state) => {
        console.log(state);
        
        return uiDispatcher(state, actionDispatcher(actions)(dispatch)(state))
    };

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
        render(
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
