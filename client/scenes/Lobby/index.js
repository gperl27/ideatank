import React, { Fragment } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import IdeaList from './components/IdeaList';
import CreateIdeaFormContainer from './components/CreateIdeaFormContainer';

import { parseNameForAvatar } from '../../util';

import {
    fetchIdeas,
    joinGame,
    createIdea,
    leaveGame,
    cancelGame,
    startGame,
} from '../../modules/lobby'
import { signout } from '../../modules/auth';

import { authUserIdea, authUserParticipantIdea } from './selector';

class Lobby extends React.Component {

    componentDidMount() {
        this.props.fetchIdeas();
    }

    submit = ({ description }) => {
        // only create an event if a user hasnt already made one
        if (!this.props.authUserIdea) {
            this.props.createIdea({ description })
        }
    }

    renderPartyMembers(participants, classes) {
        let size = 3;
        const Participants = participants
            .slice(0, size)
            .map(user => {
                return (
                    <Avatar className={classes.avatar} key={user._id}>
                        {parseNameForAvatar(user.name)}
                    </Avatar>
                )
            })

        const ExtraParticipantCounter = participants.length > size ?
            <Avatar>
                +{participants.length - size}
            </Avatar>
            :
            null

        return (
            <Fragment>
                {Participants}
                {ExtraParticipantCounter}
            </Fragment>
        )
    }

    renderActionButton = idea => {
        const {
            authUserIdea,
            authUserParticipantIdea,
            joinGame,
            leaveGame,
            cancelGame,
        } = this.props;

        const renderButton = (fn, text, disabled = false) =>
            fn && text &&
            <Button
                disabled={disabled}
                onClick={fn}
            >
                {text}
            </Button>


        // handle rendering if user made this event
        let fn, text;
        if (authUserIdea && authUserIdea._id === idea._id) {
            fn = () => cancelGame(idea)
            text = 'Cancel'

            return renderButton(fn, text);
        }

        // handle render if user is in this party
        if (authUserParticipantIdea && authUserParticipantIdea._id === idea._id) {
            fn = () => leaveGame(idea)
            text = 'Leave'
        } else {
            fn = () => joinGame(idea)
            text = 'Join'
        }

        return renderButton(fn, text, !!authUserIdea);
    }

    render() {
        const { ideas, authUserIdea, startGame, } = this.props;

        return (
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <CreateIdeaFormContainer
                        ctaText="The next greatest thing is..."
                        didAuthUserCreateAnIdea={!!authUserIdea}
                        onSubmit={this.submit}
                    />
                    <IdeaList
                        ideas={ideas}
                        authUserIdea={authUserIdea}
                        startGame={startGame}
                        renderPartyMembers={this.renderPartyMembers}
                        renderActionButton={this.renderActionButton}
                    />
                </Grid >
            </Grid >
        )
    }
}

const mapStateToProps = state => ({
    ideas: state.lobby.ideas,
    authUserIdea: authUserIdea(state),
    authUserParticipantIdea: authUserParticipantIdea(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchIdeas,
    joinGame,
    leaveGame,
    createIdea,
    cancelGame,
    signout,
    startGame,
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Lobby);