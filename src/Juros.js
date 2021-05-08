import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './App.scss';

function Juros() {
    const [nome, setNome] = useState('');
    const [mensalidade, setMensalidade] = useState('');
    const [tempo, setTempo] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (!nome || !mensalidade || !tempo) {
            swal({
                title: "Insira valores válidos",
                icon: "warning"
            })
            return
        }

        const response = await axios.post('http://api.mathjs.org/v4/', {
            expr: `${mensalidade} * (((1 + 0.00517) ^ ${tempo * 12} - 1) / 0.00517)`
            // [valor da mensalidade * (((1 + [taxa de juros]) ^ [tempo de contribuicao em meses] - 1) / [taxa de juros]
        });
        const result = Number(response.data.result)
        swal({ 
            title: "Estimativa calculada",
            text: `Olá ${nome}, juntando R$ ${mensalidade} todo mês, você terá R$ ${result.toFixed(2)} em ${tempo} anos`, 
            button: "Simular novamente", 
            icon: "success"
        })

        setNome('')
        setMensalidade('')
        setTempo('')
    }

    return (
        <div className="App">
            <div className="header">
                <h1>Ciclic</h1>
            </div>
            <div className="body">
                <h2>Simulador</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="row">
                        <label>Nome</label>
                        <input placeholder="Digite seu nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="row">
                        <label>Mensalidade</label>
                        <input placeholder="Digite a mensalidade" type="number" value={mensalidade} onChange={(e) => setMensalidade(e.target.value)} />
                    </div>
                    <div className="row">
                        <label>Tempo</label>
                        <select value={tempo} onChange={(e) => setTempo(e.target.value)}>
                            <option value="" selected disabled hidden>Selecione o tempo</option>
                            <option value='1'>1 ano</option>
                            <option value='2'>2 anos</option>
                            <option value='3'>3 anos</option>
                            <option value='4'>4 anos</option>
                            <option value='5'>5 anos</option>
                        </select>
                    </div>
                    <div className="button">
                        <button type="submit">Simular</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Juros;