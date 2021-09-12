import {Component} from "react";
import {withRouter} from "react-router-dom";
import {routes} from "../../routes/Routes";
import {API_URL} from "../../service/Api";
import AuthService from "../../service/AuthService";

class AddForm extends Component {

    state = {
        barrelTapId: ""
    }

    handleFormSubmit = () => {
        fetch(`${API_URL}/barrelTaps/add`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': AuthService.getHeaders()
            },
            method: 'POST',
            body: JSON.stringify(this.state)
        })
            .then(res => {
                if (!res.ok) throw res;
                return res.json();
            })
            .then(() => this.props.history.push(routes.barrels))
            .catch(error => {
                if (error.status === 401) {
                    this.props.history.push(routes.logout);
                }
            });

    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Numer kraniku</label>
                    <input type="number" className="form-control" id="barrelTapId" name="barrelTapId"
                           value={this.state.barrelTapId} onChange={this.handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.handleFormSubmit}>Dodaj kranik</button>
            </div>
        );
    }
}

export default withRouter(AddForm);
