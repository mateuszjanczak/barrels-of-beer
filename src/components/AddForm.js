import {Component} from "react";
import { withRouter } from "react-router-dom";
import {routes} from "../routes/Routes";
import {API_URL} from "../service/Api";

class AddForm extends Component {

    state = {
        id: "",
        totalCapacity: ""
    }

    handleFormSubmit = () => {
        fetch(API_URL + '/barrels/add', {
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
                    <label htmlFor="id" className="form-label">Numer beczki</label>
                    <input type="number" className="form-control" id="id" name="id" value={this.state.id} onChange={this.handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Pojemność [L]</label>
                    <input type="number" className="form-control" id="totalCapacity" name="totalCapacity" value={this.state.totalCapacity} onChange={this.handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.handleFormSubmit}>Dodaj beczkę</button>
            </div>
        );
    }
}

export default withRouter(AddForm);