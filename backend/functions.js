import Save from './model';

const save = async (un, code, chad, inventory, story, zone) => {
  await Save.create({
    un: un,
    code: code,
    chad: chad,
    inventory: inventory,
    story: story,
    zone: zone
  });
};

const getSaves = async (un, code) => {
  try {
  const saves = await Save.find({
    un: un,
    code: code
  });
  return saves;
  } catch (error) {
    return 'error getting saves! error: ' + error.message
  }
}

window.save = save;
window.getSaves = getSaves;