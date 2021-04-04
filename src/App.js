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
import {BarrelsFormAddView} from "./views/BarrelsFormAddView";
import {BarrelsFormSetView} from "./views/BarrelsFormSetView";
import {LogsView} from "./views/LogsView";

const App = () => (
    <Router>
        <GlobalStyle />
        <Navbar />
        <Container className={["container", "mt-5", "text-white"]}>
            <Switch>
                <Route exact path={routes.homepage} component={HomepageView} />
                <Route exact path={routes.barrels} component={BarrelsView} />
                <Route exact path={routes.statistics} component={StatisticsView} />
                <Route exact path={routes.barrelsAdd} component={BarrelsFormAddView} />
                <Route exact path={routes.logs} component={LogsView} />
                <Route path={routes.barrelsSetId} component={BarrelsFormSetView} />
            </Switch>
        </Container>
    </Router>
);

const Container = styled.div`
    
`;

export default App;
