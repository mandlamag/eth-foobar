pragma solidity ^0.4.19;

import "./Owned.sol";
contract Participants  is Owned {

    event ParticipationChanged(address member, bool isParticipant);
    struct Participant {
        address participant;
        string name;
        uint participantSince;
        bool active;
    }

    mapping (address => uint) public participantId;
    mapping (address => Participant) private accountToParticipant;
    Participant[] public participants;

    function addParticipant(address targetParticipant, string participantName) onlyOwner public {
        uint id = participantId[targetParticipant];
        if (id == 0) {
            participantId[targetParticipant] = participants.length;
            id = participants.length++;
        }

        participants[id] = Participant({participant: targetParticipant, participantSince:now, name: participantName, active:true});
        ParticipationChanged(targetParticipant, true);
    }

    function removeParticipant(address targetParticipant) onlyOwner public {
        require(participantId[targetParticipant] != 0);

        for (uint i = participantId[targetParticipant]; i<participants.length-1; i++){
            participants[i] = participants[i+1];
        }
        delete participants[participants.length-1];
        participants.length--;
    }

   function getParticipant(address participant) public view returns (address, string) {
        uint index = participantId[participant];
        return (participants[index].participant, participants[index].name);
    }

    // function getParticipants() public view  {
        
    //    return participants;
    // }

    function getParticipantCount() public view returns (uint) {
        uint count = 0;
        for (uint i = 0; i < participants.length; i++) {
             count++;
        }
        return count;
   }

}