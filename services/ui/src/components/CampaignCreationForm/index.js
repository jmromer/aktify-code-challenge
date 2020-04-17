import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

export const CampaignCreationForm = ({
    handleSubmit,
    handleCancel,
    isLoading,
    isErrored,
}) => (
    <form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item>
                <FormControl>
                    <TextField
                        autoComplete='false'
                        autoFocus={true}
                        id='name'
                        label='Name'
                        size='medium'
                        variant='standard'
                        required
                    />
                </FormControl>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item>
                <FormControl>
                    <TextField
                        multiline={true}
                        rows={3}
                        id='description'
                        label='Description'
                        variant='standard'
                    />
                </FormControl>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item>
                <FormControl>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    aria-describedby='isActiveText'
                                    color='primary'
                                    id='isActive'
                                    size='small'
                                />
                            }
                            label='Active?'
                            labelPlacement='end'
                        />
                    </FormGroup>
                    <FormHelperText id='isActiveText'>
                        Should the campaign go live immediately?
                    </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>

        <Grid container>
            <Grid item>
                <Button type='submit'>Create</Button>
                <Button type='reset' onClick={handleCancel}>
                    Cancel
                </Button>
            </Grid>
        </Grid>

        <Grid container>
            <Grid item>{isLoading && <span>Loading...</span>}</Grid>
            <Grid item>
                {isErrored && (
                    <span>
                        An error occurred. We could not create the campaign.
                    </span>
                )}
            </Grid>
        </Grid>
    </form>
);

CampaignCreationForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isErrored: PropTypes.bool.isRequired,
};

export default CampaignCreationForm;
