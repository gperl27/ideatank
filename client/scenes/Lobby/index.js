import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { parseNameForAvatar } from '../../util';

import { fetchIdeas, joinGame } from '../../modules/lobby'

class Lobby extends React.Component {

    componentDidMount() {
        this.props.fetchIdeas();
    }

    renderPartyMembers(partcipants) {
        let size = 3;
        const Partcipants = partcipants
            .slice(0, size)
            .map(value => {
                return (
                    <Avatar key={value._id}>
                        {parseNameForAvatar(value.name)}
                    </Avatar>
                )
            })

        const ExtraParticipantCounter = partcipants.length > size ?
            <Avatar>
                +{partcipants.lenght - size}
            </Avatar>
            :
            null

        return (
            <div>
                <Partcipants />
                <ExtraParticipantCounter />
            </div>
        )
    }

    render() {
        const { ideas, joinGame } = this.props;

        return (
            <div>
                <div>
                    <Typography variant="title">Have an idea?</Typography>
                    <TextField
                        label="Name"
                        margin="normal"
                    />
                </div>
                <div>
                    <Paper>
                        <List>
                            {ideas && ideas.map(idea => (
                                <ListItem key={idea._id}>
                                    {console.log(idea)}
                                    <Avatar>{parseNameForAvatar(idea.creator.name)}</Avatar>
                                    <ListItemText primary={idea.description} />
                                    {ideas.partcipants && this.renderPartyMembers(ideas.partcipants)}
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
    joinGame
}, dispatch)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Lobby);