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

import CreateIdeaForm from './components/CreateIdeaForm'

import { parseNameForAvatar } from '../../util';

import { fetchIdeas, joinGame, createIdea } from '../../modules/lobby'

class Lobby extends React.Component {

    componentDidMount() {
        this.props.fetchIdeas();
    }

    submit = ({ description }) => {
        console.log(description, 'description')
        // print the form values to the console
        this.props.createIdea({ description })
    }

    renderPartyMembers(participants) {
        let size = 3;
        const Participants = participants
            .slice(0, size)
            .map((value, i) => {
                return (
                    <Avatar key={i}>
                        {parseNameForAvatar(value.name)}
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

    render() {
        const { ideas, joinGame } = this.props;

        return (
            <div>
                <div>
                    <Typography variant="title">Have an idea?</Typography>
                    <CreateIdeaForm onSubmit={this.submit} />
                </div>
                <div>
                    <Paper>
                        <List>
                            {ideas && ideas.map(idea => (
                                <ListItem key={idea._id}>
                                    {console.log(idea)}
                                    <Avatar>{parseNameForAvatar(idea.creator.name)}</Avatar>
                                    <ListItemText primary={idea.description} />
                                    {idea.participants && this.renderPartyMembers(idea.participants)}
                                    <Button onClick={() => joinGame(idea)}>Join/Leave</Button>
                                </ListItem>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchIdeas,
    joinGame,
    createIdea,
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Lobby);