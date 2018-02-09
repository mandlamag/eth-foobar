var Participants = artifacts.require("./Participants.sol");

module.exports = function(deployer) {
  deployer.deploy(Participants);
};
