import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, Typography, Button, Grid } from '@material-ui/core';

import GameDetails from './components/GameDetails';
import Players from './components/Players';

import { isCreator, isBrainstorming, activePhase } from './selector';

import {
    startPhase,
    createThought,
    userIsTyping,
} from '../../modules/game'

import { redirectToLobby } from '../../modules/nav';

import Whiteboard from './components/Whiteboard';

const styles = {
    root: {
        marginTop: 50
    },
};

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

        return isCreator ?
            <Button disabled={isBrainstorming} onClick={startPhase}>Start phase</Button>
            : null
    }

    render() {
        const {
            game,
            activePhase,
            timer,
            userIsTyping,
            isBrainstorming,
            usersTyping,
            authUser,
            classes,
        } = this.props;

        return (
            game && activePhase ?
                <Grid className={classes.root} container justify="center" alignItems="center">
                    <Grid item xs={8} >
                        <Grid container direction="column" spacing={40}>
                            <Grid item>
                                <GameDetails
                                    isBrainstorming={isBrainstorming}
                                    timer={timer}
                                    game={game}
                                    activePhase={activePhase}
                                    startButton={this.renderStartButton()}
                                />
                            </Grid>
                            <Grid item>
                                <Players
                                    authUser={authUser}
                                    players={game.roomUsers}
                                    usersTyping={usersTyping}
                                />
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="display1">
                                    {activePhase.instructions}
                                </Typography>
                                <Whiteboard
                                    userIsTyping={userIsTyping}
                                    isBrainstorming={isBrainstorming}
                                    onSubmit={this.submit}
                                    activePhase={activePhase}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                : null
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.auth.authUser,
    game: state.game.activeGame,
    timer: state.game.timer,
    usersTyping: state.game.usersTyping,
    activePhase: activePhase(state),
    isCreator: isCreator(state),
    isBrainstorming: isBrainstorming(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startPhase,
    createThought,
    userIsTyping,
    redirectToLobby
}, dispatch)

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Game);