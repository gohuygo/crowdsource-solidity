import React, { Component } from 'react';
import Layout from '../../components/Layout';

class CampaignShow extends Component{
  // static async getInitialProps() {
  //   // Exclusively used by NextJS
  //   const campaigns = await factory.methods.getDeployedCampaigns().call()
  //   return { campaigns };
  // }


  render() {
    return(
      <Layout>
        <h3>CampaignShow</h3>
      </Layout>
    )
  }
}

export default CampaignShow;
