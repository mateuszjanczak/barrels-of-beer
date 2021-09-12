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
import {BarrelsView} from "./views/BarrelsView";
import {RankingView} from "./views/RankingView";
import {BarrelsFormAddView} from "./views/BarrelsFormAddView";
import {BarrelsFormSetView} from "./views/BarrelsFormSetView";
import {LogsView} from "./views/LogsView";
import {StatisticsView} from "./views/StatisticsView";
import {BarrelsFormHitView} from "./views/BarrelsFormHitView";
import {AdminView} from "./views/AdminView";

const App = () => (
    <Router>
        <GlobalStyle />
        <Navbar />
        <Container className={["container-fluid", "mt-5", "text-white"]}>
            <Switch>
                <Route exact path={[routes.homepage, routes.barrels]} component={BarrelsView} />
                <Route exact path={routes.ranking} component={RankingView} />
                <Route exact path={routes.statistics} component={StatisticsView} />
                <Route exact path={routes.barrelsAdd} component={BarrelsFormAddView} />
                <Route exact path={routes.logs} component={LogsView} />
                <Route exact path={routes.admin} component={AdminView} />
                <Route path={routes.barrelsSetId} component={BarrelsFormSetView} />
                <Route path={routes.barrelsHitId} component={BarrelsFormHitView} />
            </Switch>
        </Container>
    </Router>
);

const Container = styled.div`
    
`;

export default App;
