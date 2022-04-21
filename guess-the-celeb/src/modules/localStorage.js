function sortUser() {
  const data = JSON.parse(localStorage.getItem('game'));

  data.sort((a, b) => (a.points > b.points ? -1 : 1));
  return (data);
}
function getUser() {
  const users = JSON.parse(localStorage.getItem('game'));
  return users;
}

function addUser(username, users) {
  const entry = {
    player: username.current,
    points: 0,
  };
  users.push(entry);
  localStorage.setItem('game', JSON.stringify(users));
}

function findPlayer(user) {
  const data = JSON.parse(localStorage.getItem('game'));
  const p = data.find((i) => i.player === user);
  return p;
}

function deletePlayer(user) {
  let dataArr = JSON.parse(localStorage.getItem('game'));
  dataArr = dataArr.filter((item) => item.player !== user);
  localStorage.setItem('game', JSON.stringify(dataArr));
}

function updateUser(data) {
  localStorage.setItem('game', JSON.stringify(data));
}
module.exports = {
  sortUser, getUser, addUser, findPlayer, deletePlayer, updateUser,
};
