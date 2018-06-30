import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const RenderListItem = ({ label, text, children }) =>
    <ListItem>
        <ListItemText primary={label} secondary={text} />
        {children}
    </ListItem>

const GameDetails = ({ game }) =>
    game &&
    <Paper>
        <List>
            <RenderListItem
                label="Description"
                text={game.description}
            />
            <RenderListItem
                label="Creator"
                text={game.creator.name}
            >
                avatar here
            </RenderListItem>
            <RenderListItem
                label="Participants"
                text={game.creator.name}
            >
                avatars here
            </RenderListItem>
            <RenderListItem
                label="Total thoughts"
                text={game.thoughts.length}
            />
        </List>
    </Paper>

export default GameDetails;