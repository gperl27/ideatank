import React from 'react';
import { withStyles, Paper, List, ListItem, ListItemText, Button } from '@material-ui/core';

import UserAvatar from '../../../shared/UserAvatar'

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
                            <UserAvatar name={idea.creator.name} />
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