import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Fire from './Fire';

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 0.075em solid black;
    margin: 1em auto;
    padding: 1em;
    width: 30%;
    height: 60vh;
    background-color: white;

    @media (max-width: 1200px) {
        width: 40%;
    }

    @media (max-width: 992px) {
        width: 50%;
        height: 82.5vh;
    }

    @media (max-width: 768px) {
        width: 70%;
    }

    @media (max-width: 576px) {
        border: none;
        width: 92.5%;
        height: 100vh;
        padding: 1em;
    }
`;

const StyledLink = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    margin: 1.125em 0.5em;
    padding: 0.5em;
    color: white;
    background-color: #0022ff;
    border-radius: 0.5em;
    font-family: 'Lato';
    font-weight: 500;
    font-size: 1em;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
        opacity: 0.9;
    }

    @media (max-width: 576px) {
        margin-left: 0.25em;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    padding: 0.5em;
    margin: 0.5em;
    color: white;
    background-color: #0022ff;
    border-radius: 0.5em;
    font-family: 'Lato';
    font-weight: 500;
    font-size: 1em;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const FireButton = styled(Button) <{ disabled: boolean }>`
    background-color: ${props => props.disabled ? 'white' : '#0022ff'};
    border: ${props => props.disabled ? '1px solid black' : 'none'};
    opacity: ${props => props.disabled ? '0.3' : '1'};

    &:hover {
        opacity: ${props => props.disabled ? '0.3' : '0.9'};
    }
`;

const NextStepButton = styled(Button)`
    width: 80%;
`;

const StyledLabel = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%;
    width: fit-content;
    
    select {
        margin-left: 0.5em;
        padding: 0.5em;
        border-radius: 0.5em;
        font-family: 'Lato';
        font-size: 1em;

        @media (max-width: 768px) {
            margin-left: 0;
            width: 100%;
        }

        @media (max-width: 576px) {
            margin-right: 0;
        }
    }
`;

const Paragraph = styled.p<{ matches: number }>`
    text-decoration: ${props => props.matches < 1 ? 'line-through' : 'none'};
`;

function Game() {
    const [matches, setMatches] = useState(25);
    const [currentPlayer, setCurrentPlayer] = useState<'player' | 'ai'>('player');
    const [gameMode, setGameMode] = useState<'playerFirst' | 'aiFirst'>('playerFirst');

    const playerTurn = (playerChoice: number) => {
        setMatches(matches - playerChoice);
        setCurrentPlayer('ai');
    };

    const aiTurn = () => {
        let aiChoice: number;

        if (matches === 2 || matches === 3) {
            aiChoice = 1;
        } else {
            if (matches % 2 === 0) {
                aiChoice = matches % 4;
                if (aiChoice === 0) {
                    aiChoice = 1;
                }
            } else {
                aiChoice = (matches - 1) % 4;
                if (aiChoice === 0) {
                    aiChoice = 1;
                }
            }
        }

        setMatches(matches - aiChoice);
        setCurrentPlayer('player');
    };

    const handlePlayerTurn = (playerChoice: number) => {
        if (currentPlayer === 'player') {
            playerTurn(playerChoice);
        }
    };

    const switchGameMode = (gameMode: 'playerFirst' | 'aiFirst') => {
        setMatches(25);
        setCurrentPlayer(gameMode === 'playerFirst' ? 'player' : 'ai');
        setGameMode(gameMode);
    };

    const resetGame = () => {
        setMatches(25);
        setCurrentPlayer('player');
        setGameMode('playerFirst');
    };

    return (
        <Container>
            <Link to="/instruction">
                <StyledLink>
                    Instruction
                </StyledLink>
            </Link>
            <div>
                <h1>Match Game</h1>
                <p>Matches left: {matches}</p>
                {currentPlayer === 'player' ? (
                    <Paragraph matches={matches}>It's your turn. How many matches do you want to take? (1-3)</Paragraph>
                ) : (
                    <Paragraph matches={matches}>AI is playing...</Paragraph>
                )}
                {currentPlayer === 'player' && (
                    <ButtonContainer>
                        {[1, 2, 3].map((number) => (
                            <FireButton
                                key={number}
                                onClick={() => handlePlayerTurn(number)}
                                disabled={matches < number}
                            >
                                {Array.from({ length: number }, (_, index) => (
                                    <Fire key={index} />
                                ))}
                            </FireButton>
                        ))}
                    </ButtonContainer>
                )}
                {(currentPlayer === 'ai' && matches !== 0) && (
                    <ButtonContainer>
                        <NextStepButton onClick={aiTurn}>
                            Back to my step
                        </NextStepButton>
                    </ButtonContainer>
                )}
                <StyledLabel>
                    Game Mode:
                    <select
                        value={gameMode}
                        onChange={(event) => switchGameMode(event.target.value as 'playerFirst' | 'aiFirst')}
                    >
                        <option value="playerFirst">Player First</option>
                        <option value="aiFirst">AI First</option>
                    </select>
                </StyledLabel>
                {matches === 0 && (
                    <>
                        <p>{currentPlayer === 'player' ? 'You won!' : 'You lost!'}</p>
                        <ButtonContainer>
                            <Button onClick={() => resetGame()}>Start Again</Button>
                        </ButtonContainer>
                    </>
                )}
            </div>
        </Container>
    );
};

export default Game;
