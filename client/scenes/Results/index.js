import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';

import Header from './components/Header';
import GameDetails from './components/GameDetails';
import Actions from './components/Actions';
import Participants from './components/Participants';
import Thoughts from './components/Thoughts';

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
        const { classes, game } = this.props;
        console.log(game);
        return (
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
                            <GameDetails game={game} />
                        </Grid>
                        <Grid item>
                            <Thoughts />
                        </Grid>
                        <Grid item>
                            <Participants />
                        </Grid>
                        <Grid item>
                            <Actions />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    game: state.game.activeGame,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    redirectToLobby,
}, dispatch)

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Results);