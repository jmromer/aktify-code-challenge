import {useQuery} from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import {useParams} from 'react-router-dom';
import Title from '../../components/Title';
import {useViewTitle} from '../../contexts/ViewContext';

const GET_CAMPAIGN = gql`
    query ListCampaigns($id: Int!) {
        campaign(id: $id)
            @rest(type: "Campaign", path: "/campaigns/{args.id}") {
            id
            name
            description
            isActive
            createdOn
            updatedOn
        }
    }
`;

const CampaignDetailsView = () => {
    useViewTitle('Campaign Details');
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_CAMPAIGN, {variables: {id}});

    if (loading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return <span>An error occurred. We could not fetch the campaign</span>;
    }

    const {name, description, isActive, createdOn} = data?.campaign || {};

    return (
        <>
            <Title>{name}</Title>
            <Typography component='h2'>{description}</Typography>
            <Typography component='p' variant='body2'>
                Campaign <strong>{name}</strong> is{' '}
                <strong>{isActive ? 'live' : 'not live'}</strong>.
            </Typography>
            <Typography component='p' variant='body2'>
                Created on {createdOn}
            </Typography>
        </>
    );
};

export default CampaignDetailsView;
