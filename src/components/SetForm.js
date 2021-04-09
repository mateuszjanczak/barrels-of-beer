import {Component} from "react";
import {routes} from "../routes/Routes";
import {withRouter} from "react-router-dom";
import {API_URL} from "../service/Api";

class SetForm extends Component {

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

        this.fetchBarrel(id);
    }

    fetchBarrel = (barrelTapId) => {
        fetch(API_URL + '/barrelTaps/' + barrelTapId).then(data => data.json()).then(barrel => this.setState({...barrel}))
    }

    handleFormSubmit = (barrelTapId) => {
        const { barrelName, barrelContent, capacity } = this.state;

        fetch(API_URL + '/barrelTaps/' + barrelTapId + '/set', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                barrelName,
                barrelContent,
                capacity
            })
        }).then(() => this.props.history.push(routes.barrels))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const {barrelName, barrelContent, capacity, id } = this.state;

        return (
            <div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Numer kraniku</label>
                    <input type="text" className="form-control" id="id" value={id} disabled/>
                </div>

                <div className="mb-3">
                    <label htmlFor="beerType" className="form-label">Kod beczki</label>
                    <input type="text" className="form-control" id="barrelName" name="barrelName" value={barrelName} onChange={this.handleChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="barrelContent" className="form-label">Typ piwa</label>
                    <select className="form-select" id="barrelContent" name="barrelContent" value={barrelContent} onChange={this.handleChange}>
                        <option value="CHMYZ_Pils">CHMYZ Pils</option>
                        <option value="GAZDA_Marcowe">GAZDA Marcowe</option>
                        <option value="KRASA_Weizen">KRASA Weizen</option>
                        <option value="UPIR_Dunkel">UPIR Dunkel</option>
                        <option value="KICARZ_Koźlak">KICARZ Koźlak</option>
                        <option value="KADUK_Podwójny_Koźlak">KADUK Podwójny Koźlak</option>
                        <option value="SĘDEK_IPA">SĘDEK IPA</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Ilość piwa w [ml]</label>
                    <input type="number" className="form-control" id="capacity" name="capacity" value={capacity} onChange={this.handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={() => this.handleFormSubmit(id)}>Ustaw</button>
            </div>
        );
    }
}

export default withRouter(SetForm);