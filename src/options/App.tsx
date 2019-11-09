import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages';
import './App.scss';

const App = () => {
    const header = React.useMemo(() => {
        return (
            <header>
                <h1 className="title">Refined Nowcoder 选项与帮助</h1>
            </header>
        );
    }, []);

    return (
        <div className="app">
            {header}
            <div className="main-container">
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default hot(App);
