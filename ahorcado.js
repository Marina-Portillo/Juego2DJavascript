const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
const canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

//opacidad al inicio
canvas.style.display = 'none';
usedLettersElement.style.display = 'none';

// Agregar clic al botón de inicio
startButton.addEventListener('click', () => {
    // Mostrar el canvas y el elemento de letras usadas al hacer clic en el botón de inicio
    canvas.style.opacity = '1';
    usedLettersElement.style.display = 'block'; 
    startGame(); 
});


// cuerpo del ahorcado
const bodyParts = [
    [4, 2, 1, 1], 
    [4, 3, 1, 2], 
    [3, 5, 1, 1],
    [5, 5, 1, 1], 
    [3, 3, 1, 1], 
    [5, 3, 1, 1] 
];

// Variables del juego
let selectedWord;
let usedLetters;
let mistakes;
let hits;

// Función para agregar una letra al elemento de letras usadas
const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
};

// Función para agregar una parte del cuerpo al canvas
const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

// Función para finalizar el juego con un mensaje
const endGame = message => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';

    // Mostrar mensaje de fin de juego
    const endMessage = document.createElement('p');
    endMessage.innerText = message;
    wordContainer.appendChild(endMessage);
};

// Función para manejar la letra correcta
const correctLetter = letter => {
    const { children } = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame('🎉 ¡Felicidades! ¡Has adivinado la palabra! 🎉');
};

// Función para manejar la letra incorrecta
const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) {
        endGame('¡FIN DEL JUEGO! 😣 La palabra era: ' + selectedWord.join(''));
    }
};

// Función para manejar la entrada de letras
const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

// Función para manejar el evento de tecla presionada
const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

// Función para dibujar las letras ocultas de la palabra
const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

// Definir categorías y palabras asociadas
const categories = {
    animales: ['LEON', 'ELEFANTE', 'TIGRE', 'JIRAFA', 'TORTUGA'],
    frutas: ['MANZANA', 'PLATANO', 'UVA', 'KIWI', 'PIÑA'],
    paises: ['ESTADOSUNIDOS', 'CHINA', 'INDIA', 'BRASIL', 'RUSIA'],
    color: ['ROSA', 'ROJO', 'AZUL', 'AMARILLO', 'VERDE', 'VIOLETA'],
    nombreDePersonas: ['JUAN','OMAR','OSCAR','DAVID','LAURA','GAEL','KELLY','MARINA','GUADALUPE']
};

// Función para seleccionar una palabra aleatoria de una categoría
const selectRandomWordByCategory = category => {
    const randomWord = categories[category][Math.floor(Math.random() * categories[category].length)];
    return randomWord;
};

// Función para seleccionar una palabra al azar de cualquier categoría
const selectRandomWord = category => {
    let word = selectRandomWordByCategory(category).toUpperCase();
    selectedWord = word.split('');
};

// Función para dibujar el cuerpo del ahorcado
const drawHangMan = () => {
    ctx.canvas.width = 1000;
    ctx.canvas.height = 200;
    ctx.scale(30, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

// Función para iniciar el juego
const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';

    // Seleccionar una categoría aleatoria
    const categoriesKeys = Object.keys(categories);
    const selectedCategory = categoriesKeys[Math.floor(Math.random() * categoriesKeys.length)];

    // Mostrar la categoría
    const categoryElement = document.createElement('p');
    categoryElement.innerText = `Categoría: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
    wordContainer.appendChild(categoryElement);

    // Seleccionar una palabra aleatoria de la categoría
    selectRandomWord(selectedCategory);

    drawHangMan();
    drawWord();
    document.addEventListener('keydown', letterEvent);
  canvas.style.display = 'block';
  canvas.style.opacity = '1';
};

// Agregar evento de clic al botón de inicio
startButton.addEventListener('click', () => {
    startGame();
});