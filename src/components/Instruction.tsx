import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Paragraph = styled.p`
    width: 40%;

    @media (max-width: 1200px) {
        width: 50%;
    }

    @media (max-width: 992px) {
        width: 60%;
    }

    @media (max-width: 768px) {
        width: 70%;
    }

    @media (max-width: 576px) {
        width: 80%;
    }
    @media (max-width: 576px) {
        width: 90%;
    }
`;

const StyledLink = styled.button`
    margin: 0.5em;
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
`;

function Instruction() {
    return (
        <Container>
            <h1>Instruction</h1>
            <Paragraph>
                Two people are playing a game. From the pile of 25 matches, each player takes either 1, 2 or 3
                matches on each turn. The game is over once all matches are taken. Whoever has the even
                amount of matches wins.
            </Paragraph>
            <Link to="/">
                <StyledLink>
                    Back to the game
                </StyledLink>
            </Link>
        </Container>
    );
}

export default Instruction;
