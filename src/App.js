import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled from 'styled-components';
import {routes} from "./routes/Routes";
import GlobalStyle from "./theme/Theme";
import Navbar from "./components/Navbar";
import {AppContext} from './context/AppContext';
import {BarrelsView} from "./views/BarrelsView";
import {RankingView} from "./views/RankingView";
import {BarrelsFormAddView} from "./views/BarrelsFormAddView";
import {BarrelsFormSetView} from "./views/BarrelsFormSetView";
import {LogsView} from "./views/LogsView";
import {StatisticsView} from "./views/StatisticsView";
import {BarrelsFormHitView} from "./views/BarrelsFormHitView";
import {AdminView} from "./views/AdminView";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import {AuthView} from "./views/AuthView";
import Logout from "./views/LogoutView";
import AuthService from "./service/AuthService";

class App extends React.Component {

    state = {
        authenticated: false,
        toggleAuthenticated: (isAuthenticated) => this._toggleAuthenticated(isAuthenticated)
    }

    _toggleAuthenticated = (isAuthenticated) => {
        this.setState({
            ...this.state,
            authenticated: isAuthenticated
        })
    }

    componentDidMount() {
        this._toggleAuthenticated(AuthService.isLogged());
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <Router>
                    <GlobalStyle/>
                    <Navbar/>
                    <Container className={["container-fluid", "mt-5", "text-white"]}>
                        <Switch>
                            <Route exact path={routes.login} component={AuthView}/>
                            <AuthenticatedRoute exact path={[routes.homepage, routes.barrels]} component={BarrelsView}/>
                            <AuthenticatedRoute exact path={routes.ranking} component={RankingView}/>
                            <AuthenticatedRoute exact path={routes.statistics} component={StatisticsView}/>
                            <AuthenticatedRoute exact path={routes.barrelsAdd} component={BarrelsFormAddView}/>
                            <AuthenticatedRoute exact path={routes.logs} component={LogsView}/>
                            <AuthenticatedRoute exact path={routes.admin} component={AdminView}/>
                            <AuthenticatedRoute path={routes.barrelsSetId} component={BarrelsFormSetView}/>
                            <AuthenticatedRoute path={routes.barrelsHitId} component={BarrelsFormHitView}/>
                            <AuthenticatedRoute exact path={routes.logout} component={Logout}/>
                        </Switch>
                    </Container>
                </Router>
            </AppContext.Provider>
        );
    }
}

const Container = styled.div`

`;

export default App;
