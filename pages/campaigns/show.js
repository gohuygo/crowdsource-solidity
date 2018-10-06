import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component{
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()

    return({
      minimumContribution: summary[0],
      balance:             summary[1],
      requestsCount:       summary[2],
      approversCount:      summary[3],
      manager:             summary[4],
    });
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: 'Campaign Balance (ether)',
        description:  'The total amount this campaign have to spend.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: manager,
        meta: 'Address of Contract Manager',
        description:  'This address can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:  'The minimum contribution required to become an approver.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:  'A request tries to withdraw money from the contract.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:  'Number of users who have already donated the minimum contribution.',
        style: { overflowWrap: 'break-word' }
      },
    ]
    return <Card.Group items={items} />
  }

  render() {
    return(
      <Layout>
        <h3>CampaignShow</h3>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default CampaignShow;
