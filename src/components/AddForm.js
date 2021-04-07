import {Component} from "react";
import { withRouter } from "react-router-dom";
import {routes} from "../routes/Routes";
import {API_URL} from "../service/Api";

class AddForm extends Component {

    state = {
        barrelTapId: ""
    }

    handleFormSubmit = () => {
        fetch(API_URL + '/barrelTaps/add', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(() => this.props.history.push(routes.barrels))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Numer kraniku</label>
                    <input type="number" className="form-control" id="barrelTapId" name="barrelTapId" value={this.state.barrelTapId} onChange={this.handleChange}/>
                </div>
{/*                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Typ mieszanki</label>
                    <input type="number" className="form-control" id="totalCapacity" name="totalCapacity" value={this.state.totalCapacity} onChange={this.handleChange}/>
                </div>*/}
                <button className="btn btn-primary" onClick={this.handleFormSubmit}>Dodaj kranik</button>
            </div>
        );
    }
}

export default withRouter(AddForm);