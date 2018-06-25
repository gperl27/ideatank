import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { parseNameForAvatar } from '../../../util';

import NoIdeas from './NoIdeas';

const styles = {
    avatar: {
        marginRight: 5,
    }
};

const IdeaList = ({
    classes,
    ideas,
    authUserIdea,
    startGame,
    renderPartyMembers,
    renderActionButton,
}) =>
    <Paper>
        <List >
            {
                ideas && ideas.length === 0 ? <NoIdeas text="No ideas yet!" />
                    :
                    ideas && ideas.map((idea, i) =>
                        <ListItem key={idea._id} divider={ideas.length - 1 !== i}>
                            <Avatar>{parseNameForAvatar(idea.creator.name)}</Avatar>
                            <ListItemText primary={idea.description} />
                            {idea.participants && renderPartyMembers(idea.participants, classes)}
                            {
                                authUserIdea && authUserIdea._id === idea._id ?
                                    <Button onClick={() => startGame(authUserIdea)}>
                                        Start
                                            </Button>
                                    : null
                            }
                            {renderActionButton(idea)}
                        </ListItem>
                    )
            }
        </List>
    </Paper>

export default withStyles(styles)(IdeaList);