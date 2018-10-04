pragma solidity ^0.4.17;

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

    modifier onlyManager() {
       require(msg.sender == manager);
       _;
    }

    constructor(uint minimum) public {
       manager = msg.sender;
       minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
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
}
