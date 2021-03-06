import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Home, AutoClock, BlockPost } from './pages';
import './App.scss';

const App = () => {
    return (
        <div className="app">
            <header>
                <h1 className="title">Refined Nowcoder 选项与帮助</h1>
            </header>
            <div className="main-container">
                <main className="home">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/autoClock">
                            <AutoClock />
                        </Route>
                        <Route path="/blockPost">
                            <BlockPost />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        </div>
    );
};

export default hot(App);
