import {Component} from "react";
import {routes} from "../../routes/Routes";
import {withRouter} from "react-router-dom";
import {API_URL} from "../../service/Api";

class HitForm extends Component {

    state = {
        id: "",
        currentLevel: "",
        temperature: ""
    }

    componentDidMount() {
        const { id } = this.props;
        this.setState({
            id
        })
    }

    handleFormSubmit = (barrelTapId) => {
        const { currentLevel, temperature } = this.state;
        fetch(API_URL + '/barrelTaps/' + barrelTapId + '/hit/currentLevel/' + currentLevel + '/temperature/' + temperature).then(() => this.props.history.push(routes.barrels))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const { currentLevel, temperature, id } = this.state;

        return (
            <div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Numer kraniku</label>
                    <input type="text" className="form-control" id="id" value={id} disabled/>
                </div>

                <div className="mb-3">
                    <label htmlFor="counter" className="form-label">Nowy stan licznika</label>
                    <input type="number" className="form-control" id="currentLevel" name="currentLevel" value={currentLevel} onChange={this.handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="temperature" className="form-label">Nowy stan temperatury</label>
                    <input type="number" className="form-control" id="temperature" name="temperature" value={temperature} onChange={this.handleChange}/>
                </div>

                <button className="btn btn-primary" onClick={() => this.handleFormSubmit(id)}>Ustaw</button>
            </div>
        );
    }
}

export default withRouter(HitForm);