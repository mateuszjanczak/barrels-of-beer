import {Component} from "react";
import {routes} from "../routes/Routes";
import {withRouter} from "react-router-dom";
import {API_URL} from "../service/Api";

class HitForm extends Component {

    state = {
        id: "",
        barrelName: "",
        barrelContent: "",
        capacity: ""
    }

    componentDidMount() {
        const { id } = this.props;
        this.setState({
            id
        })
    }

    handleFormSubmit = (barrelTapId) => {
        const { counter } = this.state;

        fetch(API_URL + '/barrelTaps/' + barrelTapId + '/hit/' + counter).then(() => this.props.history.push(routes.barrels))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const { counter, id } = this.state;

        return (
            <div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Numer kraniku</label>
                    <input type="text" className="form-control" id="id" value={id} disabled/>
                </div>

                <div className="mb-3">
                    <label htmlFor="counter" className="form-label">Nowy stan licznika</label>
                    <input type="number" className="form-control" id="counter" name="counter" value={counter} onChange={this.handleChange}/>
                </div>

                <button className="btn btn-primary" onClick={() => this.handleFormSubmit(id)}>Ustaw</button>
            </div>
        );
    }
}

export default withRouter(HitForm);