import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x2C9f6664e7ac26Ba7D534789F8ec10065cF97d63"
);

export default instance;
