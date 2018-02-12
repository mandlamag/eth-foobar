pragma solidity ^0.4.19;


interface IParticipants {

    function addParticipant(address targetParticipant, string name) public;
    function removeParticipant(address targetParticipant) public;

    function getParticipant(address targetParticipant) public view returns (address, string);
    function getParticipantAccounts() public view returns (address[]);
    function getParticipantCount() public view returns (uint);

}