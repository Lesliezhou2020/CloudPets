import { React, useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import Rule  from './Rule'

// Widgets import
import Button        from 'react-bootstrap/Button';
import Badge         from 'react-bootstrap/Badge';
import ListGroup     from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Modal         from 'react-bootstrap/Modal';
import ProgressBar   from 'react-bootstrap/ProgressBar';
import Row           from 'react-bootstrap/Row';
import SweetAlert    from 'react-bootstrap-sweetalert';

const Game = props => {
    const [ gameid, setGameid ] = useState('');
    const [ fullness, setFullness ] = useState(1);
    const [ happiness, setHappiness ] = useState(1);
    const [ meals, setMeals ] = useState(1);
    const [ energy, setEnergy ] = useState(1);
    const [ modalShow, setModalShow ] = useState(false);
    const [ actionImg, setActionImg ] = useState('');
    const [ actionCtx, setActionCtx ] = useState('');
    const [ actionName, setActionName ] = useState('');
    const [ game_win, setGame_win ] = useState(false);
    const [ game_loss, setGame_loss ] = useState(false);

    const eats = [
        "https://media.tenor.com/images/b870e0b0b4f432e32cd1ad8c3f525ee2/tenor.gif",
        "https://media.tenor.com/images/4e035c047c7ace71c34d8f2bc5e6af63/tenor.gif",
        "https://media.tenor.com/images/ae7e50e42b88d72b939a46c5fb1b5220/tenor.gif",
    ];

    const playing = [
        "https://media.tenor.com/images/4062e0ea72537c397b54d53d162018ce/tenor.gif",
    ]

    const dislike = [
        "https://media.tenor.com/images/3151a9353ef3b158b4f7b2ad4d856323/tenor.gif",
    ]

    const working = [
        "https://media.tenor.com/images/7cab864e2d3ef19eb49a472426233388/tenor.gif",
    ]

    const sleeping = [
        "https://media.tenor.com/images/d5102c5988d1b911230691116114178e/tenor.gif",
        "https://media.tenor.com/images/614f60294128a369ad45eefe35d71b49/tenor.gif",
    ]

    useEffect(() => {
        axios.get(`http://localhost:8000/api/game/${props.token}`)
        .then(res => {
            console.log(res);
            setFullness(res.data.fullness);
            setHappiness(res.data.happiness);
            setMeals(res.data.meals);
            setEnergy(res.data.energy);
            setGameid(res.data._id);
        })
        .catch(err => {
            console.log(err);
            navigate('/');
        });
    }, [props.token]);

    useEffect(() => {
        if (fullness >= 100 && happiness >= 100 && energy >= 100) {
            setGame_win(true);
        }

        if (fullness <= 0 || happiness <= 0 || energy <= 0) {
            setGame_loss(true);
        }
    }, [fullness, happiness, energy]);

    // Operation Buttons
    const home = () => {
        navigate('/');
    }

    const save = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/game/' + gameid, {
            fullness,
            happiness,
            meals,
            energy,
        })
            .then(res => {
                console.log(res);
                alert("Game Saved");
            });
    }

    // Cat behaviors
    const feed = () => {
        if (meals === 0) {
            alert("No meals left");
            return;
        }
        setActionName("Feed");
        setMeals(meals - 1);

        if (Math.random() > 0.25) {
            let point = Math.floor(Math.random() * 6) + 5;
            setActionCtx(`Peach loves your food and get ${point} fullness`);
            setActionImg(pick(eats));
            setFullness(fullness + point);
        } else {
            setActionCtx("Peach doesn't like your food");
            setActionImg(pick(dislike));
        }
        setModalShow(true);
    }

    const play = () => {
        setActionName("Play");
        setEnergy(energy - 5);
        
        if (Math.random() > 0.25) {
            let point = Math.floor(Math.random() * 6) + 5;
            setActionCtx(`Peach loves your game and get ${point} happiness`);
            setActionImg(pick(playing));
            setHappiness(happiness + point);
        } else {
            setActionCtx("Peach doesn't like your game");
            setActionImg(pick(dislike));
        }
        setModalShow(true);
    }

    const work = () => {
        setActionName("Work");
        setEnergy(energy - 5);

        let point = Math.floor(Math.random() * 3) + 1;
        setActionCtx(`Working for Peach and earn ${point} meal(s)`);
        setActionImg(pick(working));
        setMeals(meals + point);
        setModalShow(true);
    }

    const sleep = () => {
        setActionName("Sleep");
        setActionCtx("Sleeping to resume Peach energy");
        setActionImg(pick(sleeping));
        setHappiness(happiness - 5);
        setFullness(fullness - 5);

        setEnergy(energy + 15);
        setModalShow(true);
    }

    // Utilites
    const color = (val) => {
        if (val > 60) {
            return "success";
        } else if (val > 30) {
            return "warning";
        } else {
            return "danger";
        }
    }

    const pick = (candidates) => {
        let idx = Math.floor(Math.random() * candidates.length);
        return candidates[idx];
    }

    const modalHide = () => {
        setModalShow(false);
    }

    return(
        <Row className="justify-content-center">
            <div className="col-sm-6">
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={home}>Back Home</Button>
                    <Button variant="success" onClick={save}>Save Game</Button>
                    <Button variant="secondary">
                        Game Token <Badge variant="light" size="lg">{props.token}</Badge>
                        <span className="sr-only">unread messages</span>
                    </Button>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <Button variant="dark" onClick={feed}>Feed</Button>
                    <Button variant="dark" onClick={play}>Play</Button>
                    <Button variant="dark" onClick={work}>Work</Button>
                    <Button variant="dark" onClick={sleep}>Sleep</Button>
                    <Button variant="info">
                        Meals <Badge variant="warning" size="lg">{meals}</Badge>
                        <span className="sr-only">unread messages</span>
                    </Button>
                </div>
                <br />
                <ListGroup>
                    <ListGroupItem>
                        <Row className="justify-content-center">
                            <Badge variant="secondary" className="col-sm-2">Fullness</Badge>
                            <ProgressBar animated variant={color(fullness)} now={fullness > 100? 100 : fullness} className="col-sm-8" />
                            <Badge variant={color(fullness)} className="col-sm-1">{fullness}</Badge>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row className="justify-content-center">
                            <Badge variant="secondary" className="col-sm-2">Happiness</Badge>
                            <ProgressBar animated variant={color(happiness)} now={happiness > 100? 100 : happiness} className="col-sm-8" />
                            <Badge variant={color(happiness)} className="col-sm-1">{happiness}</Badge>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row className="justify-content-center">
                            <Badge variant="secondary" className="col-sm-2">Energy</Badge>
                            <ProgressBar animated variant={color(energy)} now={energy > 100? 100 : energy} className="col-sm-8" />
                            <Badge variant={color(energy)} className="col-sm-1">{energy}</Badge>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
                <hr />
                <Rule />
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={modalShow}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {actionName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={actionImg} alt="Actions" />
                        <p>{actionCtx}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={modalHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <SweetAlert success title="You Win!" show={game_win} onConfirm={home} onCancel={home} >
                    You had a good time with Peach cat!
                </SweetAlert>
                <SweetAlert danger title="You Lost!" show={game_loss} onConfirm={home} onCancel={home} >
                    Peach has passed away ...
                </SweetAlert>
            </div>
        </Row>
    );
}

export default Game;