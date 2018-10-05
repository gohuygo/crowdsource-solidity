const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
})

describe('Campaigns', () => {
  it('deploys two contracts', () => {
    assert(factory.options.address);
    assert(campaign.options.address);
  });

  it('deploys the campaign with the correct manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager)
  });

  it('allows people to contribute and become approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });

    const isApprover = await campaign.methods.approvers(accounts[1]).call();

    assert(isApprover)
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '0'
      });
      throw(false)
    } catch (err) {
      assert(err)
    }
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('Test', accounts[2], '1')
                          .send({from: accounts[0], gas: '1000000'});

    const request = await campaign.methods.requests(0).call()
    assert.equal('Test', request.description);
  });

  it('processes request', async () => {
    let oldBalance = await web3.eth.getBalance(accounts[1]);
    oldBalance = parseFloat(web3.utils.fromWei(oldBalance, 'ether'));

    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
                  .createRequest('A', accounts[1], web3.utils.toWei('5', 'ether'))
                  .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods
                  .approveRequest(0)
                  .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods
                  .finalizeRequest(0)
                  .send({ from: accounts[0], gas: '1000000' })

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = parseFloat(web3.utils.fromWei(balance, 'ether'));

    assert((balance - oldBalance) > 4.9)
  });
})
