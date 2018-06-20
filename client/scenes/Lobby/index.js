import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

class Lobby extends React.Component {

    renderPartyMembers() {
        return (
            [0, 1, 2].map(value => <Avatar key={value} alt="Remy Sharp" src="#" />)
        )
    }

    render() {
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
                            {[0, 1, 2, 3].map(value => (
                                <ListItem key={value}>
                                    <Avatar alt="Remy Sharp" src="#" />
                                    <ListItemText primary={`Idea description ${value + 1}`} />
                                    {this.renderPartyMembers()}
                                    {true ? <Avatar>+3</Avatar> : null}
                                    <Button>Join/Leave</Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </div>
            </div>
        )
    }
}

// state
// all ideas in phase one

export default Lobby;