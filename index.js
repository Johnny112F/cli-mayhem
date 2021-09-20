const readline = require('readline');

const { isAuthorized, unitRoleDevices } = require('./functions.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a promise based version of rl.question so we can use it in async functions
const question = (str) => new Promise((resolve) => rl.question(str, resolve));

// A list of all the steps involved in our program
const steps = {
  start: async () => {
    return steps.askName();
  },
  askName: async () => {
    const fName = await question('Whats your first name? ');
    const lName = await question('Whats your last name? ');
    let name = `${fName} ${lName}`;
    let check = await isAuthorized(fName, lName);

    if (check) {
      console.log('your authorized');
      await steps.showPoss(fName, lName);
    }
    steps.end();
  },

  showPoss: async (fName, lName) => {
    const askQ = await question('What would you like to see? ');
    let personInfo = await unitRoleDevices(fName, lName);
    if (askQ === 'all info') {
      console.log(personInfo);
    } else if (askQ === 'roles') {
      console.log(personInfo.roles);
      await steps.askAgain(fName, lName);
    } else if (askQ === 'unit_id') {
      console.log(personInfo.p_id);
      await steps.askAgain(fName, lName);
    } else if (askQ === 'devices') {
      console.log(personInfo.devices);
      await steps.askAgain(fName, lName);
    } else if (askQ === 'stop') {
      console.log('thanks for coming');
      return steps.end();
    } else {
      console.log('not a valid field');
      await steps.askAgain(fName, lName);
    }
  },

  askAgain: async (fName, lName) => {
    await steps.showPoss(fName, lName);
  },

  end: async () => {
    rl.close();
  },
};
// Start the program by running the first step.
steps.start();
