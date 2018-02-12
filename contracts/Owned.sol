pragma solidity ^0.4.19;

contract Owned {
    address public owner;
    mapping (address => uint) public participantId;

    function Owned()  public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyParticipants {
        require(participantId[msg.sender] != 0);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner  public {
        owner = newOwner;
    }
}
