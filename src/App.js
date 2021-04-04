import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import styled from 'styled-components';
import {routes} from "./routes/Routes";
import GlobalStyle from "./theme/Theme";
import Navbar from "./components/Navbar";
import {HomepageView} from "./views/HomepageView";
import {BarrelsView} from "./views/BarrelsView";
import {StatisticsView} from "./views/StatisticsView";

const App = () => (
    <Router>
        <GlobalStyle />
        <Navbar />
        <Container className={["container", "mt-5", "text-white"]}>
            <Switch>
                <Route exact path={routes.homepage} component={HomepageView} />
                <Route exact path={routes.barrels} component={BarrelsView} />
                <Route exact path={routes.statistics} component={StatisticsView} />
            </Switch>
        </Container>
    </Router>
);

const Container = styled.div`
    
`;

export default App;
