import {Component} from "react";
import { withRouter } from "react-router-dom";
import {routes} from "../routes/Routes";
import {API_URL} from "../service/Api";

class AddForm extends Component {

    state = {
        barrelName: "",
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
                    <label htmlFor="name" className="form-label">Nazwa beczki</label>
                    <input type="text" className="form-control" id="barrelName" name="barrelName" value={this.state.barrelName} onChange={this.handleChange}/>
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