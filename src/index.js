import './style.css';

const gameId = 'CsVjrIhDWuIKDeZ1pqQ';
const gameForm = document.getElementById('gameForm');

gameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = document.getElementById('userName');
  const score = document.getElementById('userScore');
  const gameFormData = {
    user: user.value,
    score: parseInt(score.value, 10),
  };
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
    method: 'POST',
    body: JSON.stringify(gameFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  user.value = '';
  score.value = '';
  return result;
});

const getData = async () => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
};

const addData = async () => {
  const users = await getData();
  const allUsersPart = document.getElementById('scores');
  users.result.forEach((user) => {
    const userInfo = `<div>${user.user}: ${user.score}</div>`;
    allUsersPart.insertAdjacentHTML('beforeend', userInfo);
  });
};

const refreshData = async () => {
  const allUsersPart = document.getElementById('scores');
  allUsersPart.innerHTML = '';
  await addData();
};

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', refreshData);

window.addEventListener('DOMContentLoaded', async () => {
  await addData();
});
