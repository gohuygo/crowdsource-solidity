import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xC59a0177657405aF0AbB4100b1a98A879aae0B65"
);

export default instance;
