const people = require('./people_list.json');

const p = people['people'];
const devs = people['devices'];

async function isAuthorized(fName, lName, peeps = p) {
  for (let person of p) {
    if (person.first_name === fName && person.last_name === lName) {
      if (person.roles.includes('Admin')) return true;
    }
  }
  return false;
}

async function unitRoleDevices(fName, lName, peeps = p, devices = devs) {
  let list = {};
  list.devices = [];
  let p_id;
  for (let person of p) {
    if (person.first_name === fName && person.last_name === lName) {
      let unit_id = Number(person.unit);
      p_id = unit_id;
      list.id = p_id;
      list.roles = person.roles;
    }
  }

  for (let dev in devs) {
    for (let mod of devs[`${dev}`]) {
      if (mod['unit'] === p_id) {
        let modName = mod['model'];
        let obj = {};
        obj[`${dev}`] = modName;
        list.devices.push(obj);
        // list.devices.push({ dev: modName });
      }
    }
  }
  return list;
}

module.exports = { isAuthorized, unitRoleDevices };
