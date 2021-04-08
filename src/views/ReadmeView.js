import * as React from "react";
import styled from "styled-components";
import {API_URL} from "../service/Api";

export class ReadmeView extends React.Component {

    state = {
        barrels: []
    }

    componentDidMount() {
        this.fetchBarrels();
    }

    fetchBarrels = () => {
        fetch(API_URL + '/barrelTaps')
            .then(data => data.json())
            .then(barrels  => this.setState({ barrels }));
    }

    handleReset = () => {
        const c = window.confirm("Czy na pewno chcesz usunąć całą zawartość bazy danych?");
        if(c) fetch(API_URL + '/reset-db');
    }

    render() {
        const { barrels } = this.state;
        return (
            <div>
                <Heading>Instrukcja</Heading>

                <div className="alert alert-danger" role="alert">
                    Uwaga! Pracujesz w środowisku testowym.
                </div>

                <div className="alert alert-primary" role="alert">
                    Front-end: React, Back-end: Java + Spring Boot, Baza danych: MongoDB
                </div>

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
                    <h2>Integracja z Arduino</h2>
                    <ul className="list-group">
                        <li className="list-group-item">Każdy kranik ma przypisany swój numer</li>
                        <li className="list-group-item">Przy każdym impulsie ze sterownika wyślij request pod następujący adres:</li>
                        <li className="list-group-item">{API_URL}/barrelTaps/TU_WSTAW_NUMER_KRANIKU/hit/TU_WSTAW_NOWY_STAN_LICZNIKA_W_ML</li>
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Zarejestrowane kraniki w systemie</h2>
                    <ul className="list-group">
                        {barrels.length === 0 && <p>Brak beczek w systemie.</p>}
                        {barrels.map(barrel => (
                            <li className="list-group-item list-group-item-success">{API_URL}/barrelTaps/{barrel.barrelTapId}/hit/NOWY_STAN_LICZNIKA_W_ML</li>
                        ))}
                    </ul>
                </Instruction>

                <Instruction>
                    <h2>Usuwanie zawartości bazy danych</h2>
                    <button type="button" className="btn btn-danger" onClick={this.handleReset}>Reset serwera</button>
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
