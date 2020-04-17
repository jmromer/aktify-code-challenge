/**
 * Application routes are defined in this file. It is recommended to define the routes in this location
 * and use them throughout the application. This helps as the application scales. Routes that are
 * static (i.e. /campaigns and /) can be used as string constants. If the route has parameters
 * (i.e. /campaigns/:id) use the `routeFnFactory`.
 *
 * `routeFnFactory` returns a function that resolves a path based on the provided routeParams object.
 *
 * For example, a new route might be defined like `campaignEdit: routeFnFactory('/campaigns/:id/edit')`
 *
 * `routes.campaignEdit` can then be used as a function. If you passed a campaign object to the function like:
 *
 * ```
 * const campaign = { id: 30, name: 'Campaign Name' };
 * const campaignEditPath = routes.campaignEdit(campaign);
 * ```
 *
 * then `campaignEditPath === '/campaigns/30/edit'`.
 *
 * Additionally, `routes.campaignEdit` has a property called pathTemplate that can be used to access the path
 * template. This can be helpful when defining routes. Ex:
 *
 * `<Route exact path={routes.campaignEdit.pathTemplate} component={CampaignEditView} />`
 */


import {routeFnFactory} from './utils/routeUtils';

const routes = {
    campaignList: '/campaigns',
    campaignNew: '/campaigns/new',
    campaignDetails: routeFnFactory('/campaigns/:id'),
    dashboard: '/',
};

export default routes;
