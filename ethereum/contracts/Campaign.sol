pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address campaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(campaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier onlyManager() {
       require(msg.sender == manager);
       _;
    }

    constructor(uint minimum, address sender) public {
       manager = sender;
       minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, address recipient, uint value)
        public onlyManager {
        Request memory newRequest = Request({
            description: description,
            recipient: recipient,
            value: value,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage currentRequest = requests[index];

        require(approvers[msg.sender]);
        require(!currentRequest.approvals[msg.sender]);

        currentRequest.approvals[msg.sender] = true;
        currentRequest.approvalCount++;
    }

    function finalizeRequest(uint index) public onlyManager{
        Request storage currentRequest = requests[index];
        require(!currentRequest.complete);
        require(currentRequest.approvalCount > (approversCount/2));

        currentRequest.recipient.transfer(currentRequest.value);
        currentRequest.complete = true;
    }
}
