import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react';

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
        header: balance,
        meta: 'Address of Contract Manager',
        description:  'This address can create requests to withdraw money.',
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
        meta: 'Address of Contract Manager',
        description:  'This address can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: 'Address of Contract Manager',
        description:  'This address can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Address of Contract Manager',
        description:  'This address can create requests to withdraw money.',
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
