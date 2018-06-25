import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CreateIdeaForm from './CreateIdeaForm'

const styles = {
    container: {
        marginTop: 25,
        marginBottom: 25,
    }
};

const CreateIdeaFormContainer = ({
    classes,
    ctaText,
    didAuthUserCreateAnIdea,
    onSubmit,
}) =>
    <div className={classes.container}>
        <Typography variant="title">{ctaText}</Typography>
        <CreateIdeaForm
            didAuthUserCreateAnIdea={didAuthUserCreateAnIdea}
            onSubmit={onSubmit}
        />
    </div>

export default withStyles(styles)(CreateIdeaFormContainer);