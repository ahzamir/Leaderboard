import './style.css';

const gameId = 'LYADjurhsRv39Hwpf4Ya';
const gameForm = document.getElementById('gameForm');
gameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = document.getElementById('userName');
  const score = document.getElementById('userScore');
  const gameFormData = {
    user: user.value,
    score: parseInt(score.value),
  };
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
    method: 'POST',
    body: JSON.stringify(gameFormData),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const result = await response.json();
  console.log(result);
})