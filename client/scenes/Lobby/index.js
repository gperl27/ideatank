import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CreateIdeaForm from './components/CreateIdeaForm'

import { parseNameForAvatar } from '../../util';

import { fetchIdeas, joinGame, createIdea } from '../../modules/lobby'
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

    renderPartyMembers(participants) {
        let size = 3;
        const Participants = participants
            .slice(0, size)
            .map(user => {
                return (
                    <Avatar key={user._id}>
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
            <div>
                {Participants}
                {ExtraParticipantCounter}
            </div>
        )
    }

    renderActionButton = idea => {
        const { authUserIdea, authUserParticipantIdea, joinGame } = this.props;

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
            fn = () => console.log('cancel event')
            text = 'Cancel'

            return renderButton(fn, text);
        }

        // handle render if user is in this party
        if (authUserParticipantIdea && authUserParticipantIdea._id === idea._id) {
            fn = () => console.log('leave event')
            text = 'Leave'
        } else {
            fn = () => joinGame(idea)
            text = 'Join'
        }

        return renderButton(fn, text, !!authUserIdea);
    }

    render() {
        const { ideas, signout, authUserIdea } = this.props;

        return (
            <div>
                <Button onClick={signout}>Logout</Button>
                <div>
                    <Typography variant="title">Have an idea?</Typography>
                    <CreateIdeaForm
                        didAuthUserCreateAnIdea={!!authUserIdea}
                        onSubmit={this.submit}
                    />
                </div>
                <div>
                    <Paper>
                        <List>
                            {
                                ideas && ideas.length === 0 ? <div>No ideas yet!</div>
                                    :
                                    ideas && ideas.map((idea, i) => (
                                        <div key={idea._id}>
                                            <ListItem>
                                                <Avatar>{parseNameForAvatar(idea.creator.name)}</Avatar>
                                                <ListItemText primary={idea.description} />
                                                {idea.participants && this.renderPartyMembers(idea.participants)}
                                                {this.renderActionButton(idea)}
                                            </ListItem>
                                            {ideas.length - 1 !== i ? <Divider /> : null}
                                        </div>
                                    ))}
                        </List>
                    </Paper>
                </div>
            </div >
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
    createIdea,
    signout,
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Lobby);