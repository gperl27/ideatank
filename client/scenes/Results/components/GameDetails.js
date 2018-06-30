import React from 'react';
import { Paper, List, ListItem, ListItemText, } from '@material-ui/core';

import UserAvatar from '../../../shared/UserAvatar';

const RenderListItem = ({ label, text, children }) =>
    <ListItem>
        <ListItemText primary={label} secondary={text && text} />
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
                <UserAvatar name={game.creator.name} />
            </RenderListItem>
            {
                game.participants &&
                <RenderListItem
                    label="Participants"
                >
                    {
                        game.participants.map(participant =>
                            <UserAvatar name={participant.name} />
                        )
                    }
                </RenderListItem>
            }
            <RenderListItem
                label="Total thoughts"
                text={game.thoughts.length}
            />
        </List>
    </Paper>

export default GameDetails;