document.getElementById('startGame').addEventListener('click', () => {
  const n = document.getElementById('nInput').value;
  if (n < 1) {
    alert('Please enter a valid positive integer for n.');
    return;
  }
  startGame(n);
});

function startGame(n) {
  const gameArea = document.getElementById('gameArea');
  gameArea.textContent = '';

  const numbers = [];
  for (let i = 1; i <= n; i++) {
    numbers.push(i);
  }

  numbers.forEach(num => {
    const numberDiv = document.createElement('div');
    numberDiv.className = 'number';
    numberDiv.innerHTML = `<button class="toggleSign">+</button>${num}`;

    numberDiv.sign = 1;
    numberDiv.value = num;

    const button = numberDiv.getElementsByTagName('button')[0];
    button.addEventListener('click', () => {
      if (numberDiv.sign === 1) {
        numberDiv.sign = -1;
        button.textContent = '-';
      } else {
        numberDiv.sign = 1;
        button.textContent = '+';
      }
      updateTotalSum();
    });

    gameArea.appendChild(numberDiv);
  });

  updateTotalSum(); // Call it once after all numbers are appended
}

function updateTotalSum() {
  const gameArea = document.getElementById('gameArea');
  const numberDivs = gameArea.getElementsByClassName('number');
  let totalSum = 0;

  for (let i = 0; i < numberDivs.length; i++) {
    const div = numberDivs[i];
    const value = div.value;
    const sign = div.sign;
    totalSum += value * sign;
  }

  const resultMessage = document.getElementById('resultMessage');
  resultMessage.textContent = 'Total Sum: ' + totalSum;
  return totalSum;
}

document.getElementById('checkSolution').addEventListener('click', () => {
  const totalSum = updateTotalSum();
  const resultMessage = document.getElementById('resultMessage');

  if (totalSum === 0) {
    resultMessage.textContent = 'Congratulations! The total sum is 0. 🎉';
  } else {
    resultMessage.textContent = 'The total sum is not 0. Try again!';
  }
});

document.getElementById('resetGame').addEventListener('click', () => {
  const gameArea = document.getElementById('gameArea');
  const numberDivs = gameArea.getElementsByClassName('number');
  for (let i = 0; i < numberDivs.length; i++) {
    const div = numberDivs[i];
    div.sign = 1;
    div.getElementsByTagName('button')[0].textContent = '+';
  }

  updateTotalSum();
});
