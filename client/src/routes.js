import {ADMIN_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE, REPOLIST_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import RepoList from "./pages/RepoList";
import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import Repo from "./pages/Repo";
import RepoPage from "./pages/RepoPage";

export const privateRoutes = [
    {
        path: REPOLIST_ROUTE,
        Component: <RepoList />
    },
    {
        path: REPOLIST_ROUTE + '/:id',
        Component: <RepoPage />
    }
]

export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: <MainPage />
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin />
    }
]

export const authRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    }
]