import {Component} from "react";
import {routes} from "../routes/Routes";
import {withRouter} from "react-router-dom";
import {API_URL} from "../service/Api";

class SetForm extends Component {

    state = {
        id: "",
        barrelName: "",
        capacity: ""
    }

    componentDidMount() {
        const { id } = this.props;
        this.setState({
            id
        })

        this.fetchBarrel(id);
    }

    fetchBarrel = (id) => {
        fetch(API_URL + '/barrels/' + id).then(data => data.json()).then(barrel => this.setState({...barrel}))
    }

    handleFormSubmit = (id) => {
        const { barrelName, capacity } = this.state;

        fetch(API_URL + '/barrels/' + id + '/set', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                barrelName,
                capacity
            })
        }).then(() => this.props.history.push(routes.barrels))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const {barrelName, capacity, id } = this.state;

        return (
            <div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Numer beczki</label>
                    <input type="text" className="form-control" id="id" value={id} disabled/>
                </div>

                <div className="mb-3">
                    <label htmlFor="beerType" className="form-label">Zawartość beczki</label>
                    <input type="text" className="form-control" id="barrelName" name="barrelName" value={barrelName} onChange={this.handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Ilość piwa w [L]</label>
                    <input type="number" className="form-control" id="capacity" name="capacity" value={capacity} onChange={this.handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={() => this.handleFormSubmit(id)}>Ustaw</button>
            </div>
        );
    }
}

export default withRouter(SetForm);