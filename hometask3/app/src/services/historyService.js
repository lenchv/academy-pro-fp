import { inject } from "../functions/index.js";

const getCurrentRoute = ({ location }) => () => {
    return location.hash.replace(/^#/, '');
};

const changeRoute = ({ history }) => (route) => {
    history.pushState({}, '', '#' + route);

    return route;
};

const onChangeRoute = (window) => (changeRoute) => {
    window.onpopstate = () => {
        changeRoute(getCurrentRoute(window)());
    };
};

export default inject({
    getCurrentRoute,
    changeRoute,
    onChangeRoute
});
