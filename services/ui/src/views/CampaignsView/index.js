import {useQuery} from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import React from 'react';
import CampaignList from '../../components/CampaignList';
import routes from '../../routes';
import Title from '../../components/Title';
import {useViewTitle} from '../../contexts/ViewContext';
import useLinkRenderer from '../../hooks/useLinkRenderer';

const GET_CAMPAIGNS = gql`
    query ListCampaigns {
        campaigns @rest(type: "[Campaign]", path: "/campaigns") {
            id
            name
            createdOn
            updatedOn
        }
    }
`;

const CampaignsView = () => {
    useViewTitle('Campaigns');

    const {loading, error, data} = useQuery(GET_CAMPAIGNS);
    const renderLink = useLinkRenderer(routes.campaignNew);

    if (loading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return (
            <span>
                An error occurred. We could not fetch the Flask API message at <code>/</code>
            </span>
        );
    }

    const campaigns = data?.campaigns || [];

    return (
        <Grid container>
            <Grid container>
                <Title>Campaigns</Title>
                <Grid item>
                    <Button component={renderLink}>New</Button>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item lg>
                    <Paper>
                        <CampaignList campaigns={campaigns} />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CampaignsView;
