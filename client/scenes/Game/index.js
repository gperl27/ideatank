import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CreateThoughtForm from './components/CreateThoughtForm';

import { isCreator, isBrainstorming, activeThoughtsFromKey } from './selector';

import {
    startPhase,
    createThought,
} from '../../modules/game'

class Game extends React.Component {

    submit = ({ text }) => {
        this.props.createThought({ text })
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
            <div>
                {!isBrainstorming && isCreator ? <Button onClick={startPhase}>Start phase</Button> : null}
                <div>
                    <Typography variant="title">Time left: {timer}</Typography>
                </div>
                {thoughts && thoughts.length > 0 ?
                    thoughts.map(thought => <div key={thought._id}>{thought.text}</div>)
                    :
                    <Typography variant="title">Submit a thought to get started!</Typography>
                }
                <CreateThoughtForm
                    isBrainstorming={isBrainstorming}
                    onSubmit={this.submit}
                />
            </div>
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
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Game);