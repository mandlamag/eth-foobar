
const ParticipantStoreAbtraction = artifacts.require('Participants');
let instance;


contract('Participants', (accounts) => {
  beforeEach(async() => {
    
  });

  it('can add participants', async() => {
    let instance = await ParticipantStoreAbtraction.new();

    await instance.addParticipant(accounts[1], "Badi");
    await instance.addParticipant(accounts[2], "Mandla");
    await instance.addParticipant(accounts[3], "Chris");
    await instance.addParticipant(accounts[4], "Theo");

    var length = await instance.getParticipantCount();
      assert.strictEqual(length.toNumber(), 4);

  });

  it('can get participant details', async() => {
    let instance = await ParticipantStoreAbtraction.new();


    await instance.addParticipant(accounts[1], "Chris");
    await instance.addParticipant(accounts[2], "Badi");
    await instance.addParticipant(accounts[3], "Mandla");
    await instance.addParticipant(accounts[4], "Theo");

    {
      var first = await instance.getParticipant(accounts[1]);
      assert.deepEqual(first[1], "Chris");
    }
    {
      var last = await instance.getParticipant(accounts[4]);
      assert.deepEqual(last[1], "Theo");
    }


  });

//   it('should not get participant details that doesnt exist', async() => {
//     let instance = await ParticipantStoreAbtraction.new();

//     await instance.addParticipant(accounts[1], "Chris");
//     await instance.addParticipant(accounts[2], "Badi");
//     await instance.addParticipant(accounts[3], "Mandla");
//     await instance.addParticipant(accounts[4], "Theo");


//     try {
//       var participant = await instance.getParticipant(accounts[7]);
//       console.log('participant',participant[2])
//       assert.fail("should not be able to get an unknown participant.");
//     } catch(err) {
//       assert.equal(err.message, "VM Exception while processing transaction: revert");
//     }
//   });  

//   it('can get all participant accounts', async() => {
//     let instance = await ParticipantStoreAbtraction.new();

//     await instance.addParticipant(accounts[1], "Chris");
//     await instance.addParticipant(accounts[2], "Badi");
//     await instance.addParticipant(accounts[3], "Mandla");
//     await instance.addParticipant(accounts[4], "Theo");

//     {
//       var numberOfActiveAccounts = await instance.getParticipantCount();
//       assert.equal(numberOfActiveAccounts, 4);
//     }

//     {
//       var participantAccounts = await instance.getParticipantAccounts();
//       assert.equal(participantAccounts.length, 4);
//       assert.equal(participantAccounts[0], accounts[1]);
//       assert.equal(participantAccounts[1], accounts[2]);
//       assert.equal(participantAccounts[2], accounts[3]);
//       assert.equal(participantAccounts[3], accounts[4]);
//     }
//   });


//   it('only admin can add participants', async() => {
//     let instance = await ParticipantStoreAbtraction.new();

//     await instance.addParticipant(accounts[1], "Chris");

//     try {
//       await instance.addParticipant(accounts[2], "Badi", {from: accounts[1]});
//       assert.fail("should not be able to add participant.");
//     } catch(err) {
//       assert.equal(err.message, "VM Exception while processing transaction: revert");
//     }
//   });

//   it('only active participants can get other participant details', async() => {
//     let instance = await ParticipantStoreAbtraction.new();

//     await instance.addParticipant(accounts[1], "Chris");
//     await instance.addParticipant(accounts[2], "Badi");
//     await instance.addParticipant(accounts[3], "Mandla");
//     await instance.addParticipant(accounts[4], "Theo");

//     await instance.removeParticipant(accounts[1]);

//     try {
//       await instance.getParticipant(accounts[2], {from: accounts[1]});
//       assert.fail("should not be able to get participant if participant has been removed.");
//     } catch(err) {
//       assert.equal(err.message, "VM Exception while processing transaction: revert");
//     }
//   });

//   it('only active participants are returned after a remove', async() => {
//     let instance = await ParticipantStoreAbtraction.new();

//     await instance.addParticipant(accounts[1], "Chris");
//     await instance.addParticipant(accounts[2], "Badi");
//     await instance.addParticipant(accounts[3], "Mandla");
//     await instance.addParticipant(accounts[4], "Theo");

//     await instance.removeParticipant(accounts[2]);

//     {
//       var numberOfActiveAccounts = await instance.getParticipantCount();
//       assert.equal(numberOfActiveAccounts, 3);
//     }

//     {
//       var participantAccounts = await instance.getParticipantAccounts();
//       assert.equal(participantAccounts.length, 3);
//       assert.equal(participantAccounts[0], accounts[1]);
//       assert.equal(participantAccounts[1], accounts[3]);
//       assert.equal(participantAccounts[2], accounts[4]);
//     }
//   });
  
});

toAscii = function(hex) {
  var str = '',
      i = 0,
      l = hex.length;
  if (hex.substring(0, 2) === '0x') {
      i = 2;
  }
  for (; i < l; i+=2) {
      var code = parseInt(hex.substr(i, 2), 16);
      if (code === 0) continue; // this is added
      str += String.fromCharCode(code);
  }
  return str;
};

toBytes = function(hex) {
  var i = 0,
      l = hex.length;
  if (hex.substring(0, 2) === '0x') {
      i = 2;
  }
  var bytes = [];
  for (; i < l; i+=2) {
      var code = parseInt(hex.substr(i, 2), 16);
      if (code === 0) continue; // this is added
      bytes.push(code);
  }
  return bytes;
};