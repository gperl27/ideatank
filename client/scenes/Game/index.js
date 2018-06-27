import React from 'react';
import { push } from 'react-router-redux';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import CreateThoughtForm from './components/CreateThoughtForm';
import GameDetails from './components/GameDetails';
import Players from './components/Players';

import { isCreator, isBrainstorming, activeThoughtsFromKey } from './selector';

import {
    startPhase,
    createThought,
} from '../../modules/game'
import Whiteboard from './components/Whiteboard';

class Game extends React.Component {
    componentDidMount() {
        const { game, redirectToLobby } = this.props;
        if (!game) { redirectToLobby() }
    }

    submit = ({ text }) => {
        this.props.createThought({ text })
    }

    renderStartButton = () => {
        const { isBrainstorming, isCreator, startPhase } = this.props;

        return !isBrainstorming && isCreator ? <Button onClick={startPhase}>Start phase</Button> : null
    }

    render() {
        const {
            startPhase,
            game,
            thoughts,
            timer,
            isCreator,
            isBrainstorming
        } = this.props;

        return (
            <Grid container justify="center" alignItems="center">
                <Grid item xs={8} >
                    <Grid container direction="column">
                        <Grid item>
                            <GameDetails game={game} startButton={this.renderStartButton()} />
                        </Grid>
                        <Grid item>
                            <Players players={game && game.roomUsers} />
                        </Grid>
                        <Grid item>
                            <Whiteboard
                                timer={timer}
                                isBrainstorming={isBrainstorming}
                                onSubmit={this.submit}
                                thoughts={thoughts}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    game: state.game.activeGame,
    timer: state.game.timer,
    thoughts: activeThoughtsFromKey(state),
    isCreator: isCreator(state),
    isBrainstorming: isBrainstorming(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startPhase,
    createThought,
    redirectToLobby: () => push('/')
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Game);