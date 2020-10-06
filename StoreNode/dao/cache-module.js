let dataMap = new Map();

function get(key) {
  return dataMap.get(key);
}

function set(key, value) {
  dataMap.set(key, value);
}

function deleteByKey(key) {
  dataMap.delete(key);
}

module.exports = {
  get,
  set,
  deleteByKey,
};
