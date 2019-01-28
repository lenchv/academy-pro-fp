import { inject } from "../functions/index.js";

const getCurrentRoute = ({ location }) => () => {
    return location.hash.replace(/^#/, '');
};

const redirect = ({ history }) => (changeRoute) => (route) => {
    history.pushState({}, '', '#' + route);
    changeRoute(route);

    return route;
};

const onChangeRoute = (window) => (changeRoute) => {
    window.onpopstate = () => {
        changeRoute(getCurrentRoute(window)());
    };
};

export default inject({
    getCurrentRoute,
    redirect,
    onChangeRoute
});
