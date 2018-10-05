import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  const provider = window.web3.currentProvider;
  provider.enable()

  web3 = new Web3(provider);
} else {
  // server
}


export default web3;
