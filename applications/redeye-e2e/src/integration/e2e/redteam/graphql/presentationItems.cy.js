import { graphqlRequest } from '../../../../support/utils';

describe('Query Presentation Items', () => {
	const camp = 'presentationItemsGraphQL';

	it('Query Presentation Items', () => {
		cy.uploadCampaign(camp, 'gt.redeye');

		cy.selectCampaign(camp);

		cy.clickPresentationMode();

		cy.url().then((url) => {
			const returnedUrl = url.split('/')[5];

			const query = `query presentationItems($campaignId: String!) {
        presentationItems(campaignId: $campaignId) {
        id
      }
    }`;
			const variables = { campaignId: returnedUrl };
			graphqlRequest(query, variables).then((res) => {
				const comp = res.body.data.presentationItems;
				//SHOULD AT LEAST HAVE ALL COMMENTS & FAVORITED COMMENTS
				expect(comp.length).to.be.gt(0);
			});
		});

		cy.returnToCampaignCard();
	});

	after(() => {
		cy.deleteCampaignGraphQL(camp);
	});
});
