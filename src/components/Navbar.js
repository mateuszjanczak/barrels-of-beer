import {NavLink} from "react-router-dom";
import {routes} from "../routes/Routes";

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink to={routes.homepage} className="nav-link active">Strona główna</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={routes.barrels} className="nav-link active">Beczki</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={routes.statistics} className="nav-link active">Statystyki</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;