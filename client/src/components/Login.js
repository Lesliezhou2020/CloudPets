import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios  from 'axios';
import { navigate } from '@reach/router';

const Login = props => {
    const [ gameId, setGameId ] = useState('');
    const [ msgCtx, setMsgCtx ] = useState('');

    useEffect(() => {
        if (gameId.length > 2) {
            axios.get(`http://localhost:8000/api/exists/${gameId}`)
                .then(res => {
                    if (res.data) {
                        setMsgCtx();
                    } else {
                        setMsgCtx("Not a saved Game");
                    }
                })
                .catch(err => {
                    console.log(err);
                    setMsgCtx("Not a saved Game");
                });
        } else {
            setMsgCtx("");
        }
    }, [gameId]);

    const createGame = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/api/newgame')
            .then(res => {
                console.log("Response: ", res);
                navigate(res.data.token);
            })
            .catch(err => console.log(err));
    }

    const loadGame = (e) => {
        console.log(`Loading game ${gameId}`);
        navigate(`${gameId}`);
        e.preventDefault();
    }

    return(
        <div>
            <div className="well lead">
                <Button variant="primary" className="col-sm-4" onClick={createGame}>New Game</Button>
            </div>
            <hr className="col-sm-4" />
            <div className="well lead">
                <p>Retrieve by token:</p>
                <input onChange={e => setGameId(e.target.value)} />
                <br />
                <p className="text-danger">{msgCtx}</p>
                <Button variant="dark" className="col-sm-4" onClick={loadGame}>Continue</Button>
            </div>
        </div>
    );
}

export default Login;