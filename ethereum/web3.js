
import Web3 from 'web3';

let web3;
let provider;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/58aad00ce7df473e8b6709a6eb6d3c4a");
}

web3 = new Web3(provider);

export default web3;
