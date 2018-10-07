require('dotenv').config()

import Web3 from 'web3';

let web3;
let provider;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider(process.env.INFURA_API_KEY);
}

web3 = new Web3(provider);

export default web3;
