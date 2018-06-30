import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';

import Header from './components/Header';
import GameDetails from './components/GameDetails';
import Actions from './components/Actions';
import Participants from './components/Participants';
import Thoughts from './components/Thoughts';

import { totalThoughts, participantsWithThoughtCounts } from './selector';

import { redirectToLobby } from '../../modules/nav';

const styles = {
    root: {
        marginTop: 50,
    },
};

class Results extends React.Component {
    componentDidMount() {
        const { game, redirectToLobby } = this.props;

        if (!game || !game.isCompleted) { redirectToLobby() }
    }

    render() {
        const {
            classes,
            game,
            totalThoughts,
            participants,
            redirectToLobby,
        } = this.props;

        return (
            game ?
                <Grid
                    className={classes.root}
                    justify="center"
                    alignItems="center"
                    container
                >
                    <Grid item xs={8}>
                        <Grid
                            spacing={40}
                            container
                            direction="column"
                            justify="space-around"
                        >
                            <Grid item>
                                <Header />
                            </Grid>
                            <Grid item>
                                <GameDetails
                                    game={game}
                                    totalThoughts={totalThoughts}
                                />
                            </Grid>
                            <Grid item>
                                <Thoughts phases={game.phases} />
                            </Grid>
                            <Grid item>
                                <Participants participants={participants} />
                            </Grid>
                            <Grid item>
                                <Actions
                                    redirectToLobby={redirectToLobby}
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
    game: state.game.activeGame,
    totalThoughts: totalThoughts(state),
    participants: participantsWithThoughtCounts(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    redirectToLobby,
}, dispatch)

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Results);