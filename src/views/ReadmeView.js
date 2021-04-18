import * as React from "react";
import styled from "styled-components";
import {API_URL} from "../service/Api";

export class ReadmeView extends React.Component {

    state = {
        barrels: [],
        isDev: true
    }

    componentDidMount() {
        this.fetchBarrels();
    }

    fetchBarrels = () => {
        fetch(API_URL + '/barrelTaps')
            .then(data => data.json())
            .then(barrels  => this.setState({ barrels }));
    }

    handleResetDatabase = () => {
        const c = window.confirm("Czy na pewno chcesz usunąć całą zawartość bazy danych?");
        if(c) fetch(API_URL + '/admin/reset-db');
    }

    handleEnableTaps = () => {
        fetch(API_URL + '/admin/enable-taps');
    }

    handleDisableTaps = () => {
        fetch(API_URL + '/admin/disable-taps');
    }

    render() {
        const { barrels, isDev } = this.state;
        return (
            <div className="container">
                <Heading>Instrukcja</Heading>

                {isDev && <div className="alert alert-danger" role="alert">
                    Uwaga! Pracujesz w środowisku testowym.
                </div>}

                <Instruction>
                    <h2>Tworzenie kraników</h2>
                    <ul className="list-group">
                        <li className="list-group-item">1. Wybierz przycisk 'Dodaj kranik' na stronie głównej</li>
                        <li className="list-group-item">2. W formularzu podaj numer kraniku</li>
                        <li className="list-group-item">3. Wyślij formularz</li>
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Ustawianie beczki</h2>
                    <ul className="list-group">
                        <li className="list-group-item">1. Wybierz przycisk 'Ustaw' przy wybranym kraniku</li>
                        <li className="list-group-item">2. W formularzu podaj kod beczki, zawartość beczki oraz pojemność beczki w mililitrach</li>
                        <li className="list-group-item">3. Wyślij formularz</li>
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Integracja z Node-RED</h2>
                    <ul className="list-group">
                        <li className="list-group-item">Każdy kranik ma przypisany swój numer</li>
                        <li className="list-group-item">Przy każdym impulsie ze sterownika wyślij request pod następujący adres:</li>
                        <li className="list-group-item">{API_URL}/barrelTaps/NUMER_KRANIKU/hex/DANE_HEX</li>
                        <li className="list-group-item">Przykład: {API_URL}/barrelTaps/1/hex/3F23 D70A 0000 025C</li>
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Zarejestrowane kraniki w systemie</h2>
                    <ul className="list-group">
                        {barrels.length === 0 && <p>Brak beczek w systemie.</p>}
                        {barrels.map(barrel => (
                            <li className="list-group-item list-group-item-success">{API_URL}/barrelTaps/{barrel.barrelTapId}/hex/DANE_HEX</li>
                        ))}
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Komunikacja ze sterownikiem</h2>
                    <Button type="button" className="btn btn-success" onClick={this.handleEnableTaps}>Aktywuj</Button>
                    <Button type="button" className="btn btn-primary" onClick={this.handleEnableTaps}>Odśwież</Button>
                    <Button type="button" className="btn btn-danger" onClick={this.handleDisableTaps}>Dezaktywuj</Button>
                </Instruction>

                <Instruction>
                    <h2>Baza danych</h2>
                    <Button type="button" className="btn btn-danger" onClick={this.handleResetDatabase}>Wyczyść bazę danych</Button>
                </Instruction>
            </div>
        )
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

const Instruction = styled.div`
    margin-bottom: 2rem;
  > h2 {
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  margin-right: 0.5rem;
`;