pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
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
            complete: false
        });

        requests.push(newRequest);
    }

}
