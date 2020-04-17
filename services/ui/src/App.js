import React, {useState} from 'react';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/client';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {RestLink} from 'apollo-link-rest';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import './App.css';
import AppShell from './components/AppShell';
import CampaignDetailsView from './views/CampaignDetailsView';
import CampaignNewView from './views/CampaignNewView';
import CampaignsView from './views/CampaignsView';
import DashboardView from './views/DashboardView';
import ViewContext from './contexts/ViewContext';
import routes from './routes';

const client = new ApolloClient({
    link: new RestLink({
        // Convert field names to camel case for queries
        fieldNameNormalizer: camelCase,
        // Convert field back to snake case for mutations
        fieldNameDenormalizer: snakeCase,
        uri: process.env.REACT_APP_API_URL,
    }),
    cache: new InMemoryCache(),
});

const theme = createMuiTheme({
    drawerWidth: 280,
});

const App = () => {
    const [title, setTitle] = useState('Aktify Code Challenge');
    const value = {title, setTitle};

    return (
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Router>
              <ViewContext.Provider value={value}>
                <AppShell>
                  <Switch>
                    <Route exact path={routes.campaignNew} component={CampaignNewView} />
                    <Route exact path={routes.campaignList} component={CampaignsView} />
                    <Route exact path={routes.campaignDetails.pathTemplate} component={CampaignDetailsView} />
                    <Route exact path={routes.dashboard} component={DashboardView} />
                  </Switch>
                </AppShell>
              </ViewContext.Provider>
            </Router>
          </ThemeProvider>
        </ApolloProvider>
    );
};

export default App;
