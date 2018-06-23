import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
    startPhase,
} from '../../modules/game'

class Game extends React.Component {

    render() {
        const { startPhase, game, timer } = this.props;

        return (
            <div>
                <Button onClick={startPhase}>Start phase</Button>
                <div>
                    <Typography variant="title">Time left: {timer}</Typography>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    game: state.game.activeGame,
    timer: state.game.timer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startPhase,
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Game);