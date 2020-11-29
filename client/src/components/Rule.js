import React from 'react';

// Widgets import
import Accordion     from 'react-bootstrap/Accordion';
import Card          from 'react-bootstrap/Card';
import Carousel      from 'react-bootstrap/Carousel';
import { Jumbotron } from 'react-bootstrap';

const Rule = props => {
    return(
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h2>Game Rule</h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Carousel>
                        <Carousel.Item>
                            <Jumbotron>
                                <h3>Feed</h3>
                                <p>Feeding will costs 1 meal and gains a random amount of fullness between 5 and 10
                                    (you cannot feed if you do not have meals)</p>
                            </Jumbotron>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Jumbotron>
                                <h3>Play</h3>
                                <p>Playing will costs 5 energy and gains a random amount of happiness between 5 and 10</p>
                            </Jumbotron>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Jumbotron>
                                <h3>Randomize</h3>
                                <p>Every time you play or feed there should be a 25% chance that it won't like it.
                                    Energy or meals will still decrease, but happiness and fullness won't change.</p>
                            </Jumbotron>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Jumbotron>
                                <h3>Work</h3>
                                <p>Working costs 5 energy and earns between 1 and 3 meals</p>
                            </Jumbotron>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Jumbotron>
                                <h3>Sleep</h3>
                                <p>Sleeping earns 15 energy and decreases fullness and happiness each by 5</p>
                            </Jumbotron>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Jumbotron>
                                <h3>Game Over</h3>
                                <p>If energy, fullness, and happiness are all raised to over 100, you win!</p>
                                <p>If fullness or happiness ever drop to 0, you lose.</p>
                            </Jumbotron>
                        </Carousel.Item>
                    </Carousel>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default Rule;