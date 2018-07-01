import React, { Fragment } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Avatar, Button } from '@material-ui/core';

import IdeaList from './components/IdeaList';
import CreateIdeaFormContainer from './components/CreateIdeaFormContainer';
import UserAvatar from '../../shared/UserAvatar';

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

// how many users we'll show before truncated the party list
const PARTY_SIZE = 3;

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
        let size = PARTY_SIZE;
        const Participants = participants
            .slice(0, size)
            .map(user => {
                return (
                    <UserAvatar
                        key={user._id}
                        className={classes.avatar}
                        name={user.name}
                    />
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