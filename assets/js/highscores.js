const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<ul id="highScoresList">${score.name} - ${score.score}</ul>`;
  })
  .join("");