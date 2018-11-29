import Web3 from 'web3';
import env from '../env-config.js'

let web3;
let provider;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider(env.INFURA_API_KEY || process.env.INFURA_API_KEY);
}

web3 = new Web3(provider);

export default web3;
