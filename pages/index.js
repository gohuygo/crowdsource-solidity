import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  state = { networkId: null }

  static async getInitialProps() {
    // Exclusively used by NextJS
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      }
    });

    return <Card.Group items={items} />;
  }

  isConnectedToRinkeby = () => {
    return parseInt(this.state.networkId) === 4
  }

  setNetworkId = () => {
    const { web3 } = global;
    if(!web3) return;
    web3.version.getNetwork((err, netId) =>{
      if(this.state.networkId !== netId){
        this.setState({networkId: netId})
      }
    })
  }
  componentWillMount() {
    this.setNetworkId();

  }

  renderError() {
    return(
      <Message floating negative>
        <Message.Header>Please connect to the Rinkeby testnet.</Message.Header>
        <p>
          This contract was deployed to the Rinkeby testnet. This application will not work properly unless you connect to Rinkeby using Metamask.
        </p>
      </Message>
    )
  }

  render(){
    return(
      <Layout>

        {!this.isConnectedToRinkeby() && this.renderError()}

        <div>
          <h3>Open Campaigns</h3>
          <Link route='/campaigns/new'>
            <a>
              <Button
                floated='right'
                content='New Campaign'
                icon='add circle'
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}

        </div>
      </Layout>
    )
  }
}

export default CampaignIndex;
