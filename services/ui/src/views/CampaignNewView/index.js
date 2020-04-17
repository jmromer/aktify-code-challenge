import React from 'react';
import {withRouter} from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';
import {useViewTitle} from '../../contexts/ViewContext';
import CampaignCreationForm from '../../components/CampaignCreationForm';

const CREATE_CAMPAIGN = gql`
    mutation CreateCampaign(
        $name: String!
        $description: String!
        $isActive: Boolean!
    ) {
        campaign(
            input: {name: $name, description: $description, isActive: $isActive}
        ) @rest(type: "CampaignPayload", path: "/campaigns/", method: "POST") {
            id
            name
            description
            isActive
            createdOn
            updatedOn
        }
    }
`;

const CampaignNewView = ({history}) => {
    useViewTitle('New Campaign');
    const [createCampaign, {loading, error}] = useMutation(CREATE_CAMPAIGN);

    const handleSubmit = async event => {
        event.preventDefault();
        const {data} = await createCampaign({
            variables: {
                name: event.target.name.value,
                description: event.target.description.value,
                isActive: event.target.isActive.checked,
            },
        });
        const id = data?.campaign?.id;
        id && history.push(`/campaigns/${id}`);
    };

    const handleCancel = event => {
        event.preventDefault();
        const form = event.target.closest('form');
        form.reset();
        history.goBack();
    };

    return (
        <CampaignCreationForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            isLoading={loading}
            isErrored={error}
        />
    );
};

export default withRouter(CampaignNewView);
