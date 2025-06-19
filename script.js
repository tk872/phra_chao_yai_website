// ຂໍ້ມູນຄໍາຖາມ (ເພີ່ມຄໍາຖາມໃຫ້ຫຼາຍຂຶ້ນ)
const quizQuestions = [
    {
        question: "ພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ໄດ້ຖືກຍ້າຍໄປປະດິດສະຖານຢູ່ແຂວງໃດ?",
        options: ["ນະຄອນຫຼວງວຽງຈັນ", "ຫຼວງພະບາງ", "ສະຫວັນນະເຂດ", "ຈໍາປາສັກ"],
        answer: "ຫຼວງພະບາງ"
    },
    {
        question: "ພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ຍ້າຍໄປປະດິດສະຖານທີ່ວັດໃດ?",
        options: ["ວັດສີສະເກດ", "ວັດຊຽງທອງ", "ວັດຜາໂອ", "ວັດອົງຕື້"],
        answer: "ວັດຜາໂອ"
    },
    {
        question: "ຕາມຄວາມເຊື່ອ, ການຍ້າຍພຣະພຸດທະຮູບທີ່ສຳຄັນມີຄວາມໝາຍທາງສາສະໜາແນວໃດ?",
        options: ["ເພື່ອປ່ຽນຊື່ວັດ", "ເພື່ອເສີມສີລິມຸງຄຸນ ແລະ ສ້າງບຸນກຸສົນ", "ເພື່ອຂາຍ", "ເພື່ອສ້າງທາງຜ່ານໃໝ່"],
        answer: "ເພື່ອເສີມສີລິມຸງຄຸນ ແລະ ສ້າງບຸນກຸສົນ"
    },
    {
        question: "ເຫດການການເຄື່ອນຍ້າຍພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ເກີດຂຶ້ນໃນເດືອນໃດ?",
        options: ["ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ"],
        answer: "ມີນາ" // ອ້າງອີງຈາກປ້າຍໃນຮູບທີ່ທ່ານສົ່ງມາ (18-19 ມີນາ 2025)
    },
    // ເພີ່ມຄຳຖາມອີກ 5-10 ຂໍ້ ເພື່ອໃຫ້ເກມຍາວຂຶ້ນ
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false; // ຕົວແປເພື່ອເຊັກວ່າໄດ້ຕອບຄໍາຖາມແລ້ວບໍ

// ກວດສອບວ່າອົງປະກອບມີຢູ່ແລ້ວບໍກ່ອນທີ່ຈະນຳໃຊ້ (ສຳຄັນຖ້າ script.js ຖືກໃຊ້ໃນຫຼາຍໜ້າ)
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const resultBox = document.getElementById('result-box');
const scoreSpan = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const questionBox = document.getElementById('question-box');

// ຖ້າອົງປະກອບຂອງເກມມີຢູ່ໃນໜ້ານີ້, ໃຫ້ເລີ່ມການເຮັດວຽກຂອງເກມ
if (questionText && optionsContainer && nextButton) {
    loadQuestion();
    nextButton.onclick = () => {
        if (answered) { // ໃຫ້ຄລິກປຸ່ມຕໍ່ໄປໄດ້ເມື່ອຕອບແລ້ວເທົ່ານັ້ນ
            currentQuestionIndex++;
            answered = false; // ຕັ້ງຄືນເປັນ false ສໍາລັບຄໍາຖາມຕໍ່ໄປ
            loadQuestion();
            // ລຶບສີພື້ນຫຼັງທີ່ຖືກ/ຜິດ ກ່ອນຈະໂຫຼດຄໍາຖາມໃໝ່
            const optionButtons = optionsContainer.querySelectorAll('button');
            optionButtons.forEach(button => {
                button.classList.remove('correct', 'incorrect');
                button.disabled = false;
            });
        }
    };
    restartButton.onclick = () => {
        currentQuestionIndex = 0;
        score = 0;
        answered = false;
        resultBox.style.display = 'none';
        questionBox.style.display = 'block';
        loadQuestion();
    };
}

function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const q = quizQuestions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = ''; // Clear previous options

        q.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, q.answer, button);
            optionsContainer.appendChild(button);
        });
        nextButton.style.display = 'none'; // Hide next button until answer is selected
    } else {
        showResults();
    }
}

function checkAnswer(selectedOption, correctAnswer, clickedButton) {
    if (answered) return; // ຖ້າຕອບແລ້ວ ຢ່າເຮັດຫຍັງອີກ
    answered = true; // ໝາຍວ່າຕອບແລ້ວ

    if (selectedOption === correctAnswer) {
        score++;
        clickedButton.classList.add('correct'); // ເພີ່ມ class ສີຂຽວ
    } else {
        clickedButton.classList.add('incorrect'); // ເພີ່ມ class ສີແດງ
        // ຫາຄໍາຕອບທີ່ຖືກຕ້ອງ ແລະ ໃສ່ສີຂຽວໃຫ້ມັນ
        const optionButtons = optionsContainer.querySelectorAll('button');
        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }

    // ປິດການໃຊ້ງານປຸ່ມຕ່າງໆຫຼັງຈາກຕອບ
    const optionButtons = optionsContainer.querySelectorAll('button');
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = 'block'; // Show next button
}

function showResults() {
    questionBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreSpan.textContent = `${score} / ${quizQuestions.length}`; // ສະແດງຄະແນນທັງໝົດ
        }
// --- Mobile Navigation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
    }
});

// --- Quiz Game Logic ---
// ຂໍ້ມູນຄໍາຖາມ (ເພີ່ມຄໍາຖາມໃຫ້ຫຼາຍຂຶ້ນ ແລະ ລະອຽດກວ່າ)
const quizQuestions = [
    {
        question: "ພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ໄດ້ຖືກຍ້າຍໄປປະດິດສະຖານຢູ່ແຂວງໃດ?",
        options: ["ນະຄອນຫຼວງວຽງຈັນ", "ຫຼວງພະບາງ", "ສະຫວັນນະເຂດ", "ຈໍາປາສັກ"],
        answer: "ຫຼວງພະບາງ"
    },
    {
        question: "ພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ຍ້າຍໄປປະດິດສະຖານທີ່ວັດໃດ?",
        options: ["ວັດສີສະເກດ", "ວັດຊຽງທອງ", "ວັດຜາໂອ", "ວັດອົງຕື້"],
        answer: "ວັດຜາໂອ"
    },
    {
        question: "ເຫດການການເຄື່ອນຍ້າຍພຣະພຸດທະຮູບທີ່ສຳຄັນນີ້ມີຈຸດປະສົງທາງສາສະໜາຕົ້ນຕໍແມ່ນຫຍັງ?",
        options: ["ເພື່ອປ່ຽນຊື່ວັດ", "ເພື່ອເສີມສີລິມຸງຄຸນ ແລະ ສ້າງບຸນກຸສົນອັນຍິ່ງໃຫຍ່", "ເພື່ອຂາຍ", "ເພື່ອສ້າງທາງຜ່ານໃໝ່"],
        answer: "ເພື່ອເສີມສີລິມຸງຄຸນ ແລະ ສ້າງບຸນກຸສົນອັນຍິ່ງໃຫຍ່"
    },
    {
        question: "ຕາມປ້າຍໂຄສະນາ, ການເຄື່ອນຍ້າຍພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ເກີດຂຶ້ນໃນວັນທີໃດ?",
        options: ["1-2 ມີນາ 2025", "18-19 ມີນາ 2025", "1-2 ເມສາ 2025", "18-19 ເມສາ 2025"],
        answer: "18-19 ມີນາ 2025" // (ອ້າງອີງຈາກປ້າຍໃນຮູບ)
    },
    {
        question: "ຮູບລັກສະນະຂອງພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ສ່ວນຫຼາຍແມ່ນຢູ່ໃນທ່າທາງໃດ?",
        options: ["ທ່າໄສຍາສນ໌ (ນອນ)", "ທ່າສມາທິ (ນັ່ງຂັດສະມາທິ)", "ທ່າຍ່າງ", "ທ່າຍືນ"],
        answer: "ທ່າສມາທິ (ນັ່ງຂັດສະມາທິ)"
    },
    {
        question: "ພຣະເຈົ້າໃຫຍ່ອົງຫຼວງຜາສຸຂ ເປັນພຣະພຸດທະຮູບທີ່ຍ້າຍມາຈາກເມືອງໃດກ່ອນຈະມາປະດິດສະຖານທີ່ວັດຜາໂອ?",
        options: ["ແຂວງຈໍາປາສັກ", "ແຂວງສະຫວັນນະເຂດ", "ນະຄອນຫຼວງວຽງຈັນ", "ແຂວງຄໍາມ່ວນ"],
        answer: "ນະຄອນຫຼວງວຽງຈັນ"
    },
    // ເພີ່ມຄໍາຖາມທີ່ກ່ຽວຂ້ອງກັບປະຫວັດ, ການເດີນທາງ, ຫຼື ວັດຜາໂອ ຕື່ມອີກ
    // ໃຫ້ແນ່ໃຈວ່າຄໍາຕອບສາມາດຊອກຫາໄດ້ຈາກເນື້ອຫາໃນເວັບໄຊສ໌ຂອງທ່ານ.
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// ອົງປະກອບຂອງເກມ
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const resultBox = document.getElementById('result-box');
const scoreSpan = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const questionBox = document.getElementById('question-box');

// ສຽງປະກອບ (ທາງເລືອກ)
const correctSound = new Audio('audio/correct_sound.mp3');
const incorrectSound = new Audio('audio/incorrect_sound.mp3');
// ທ່ານຕ້ອງສ້າງໄຟລ໌ສຽງເຫຼົ່ານີ້ເອງ ແລ້ວເອົາໃສ່ໃນໂຟນເດີ audio/

// ກວດສອບວ່າໜ້າປັດຈຸບັນແມ່ນໜ້າເກມກ່ອນທີ່ຈະເລີ່ມ Logic
if (questionText && optionsContainer && nextButton) {
    loadQuestion();
    nextButton.addEventListener('click', () => {
        if (answered) {
            currentQuestionIndex++;
            answered = false;
            loadQuestion();
            const optionButtons = optionsContainer.querySelectorAll('button');
            optionButtons.forEach(button => {
                button.classList.remove('correct', 'incorrect');
                button.disabled = false;
            });
        }
    });

    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        answered = false;
        resultBox.style.display = 'none';
        questionBox.style.display = 'block';
        loadQuestion();
    });
}

function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const q = quizQuestions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = '';

        // Randomize options order (ເຮັດໃຫ້ແຕ່ລະຄັ້ງບໍ່ຄືເກົ່າ)
        const shuffledOptions = shuffleArray(q.options);

        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option, q.answer, button));
            optionsContainer.appendChild(button);
        });
        nextButton.style.display = 'none';
    } else {
        showResults();
    }
}

function checkAnswer(selectedOption, correctAnswer, clickedButton) {
    if (answered) return;
    answered = true;

    if (selectedOption === correctAnswer) {
        score++;
        clickedButton.classList.add('correct');
        if (correctSound) correctSound.play(); // ຫຼິ້ນສຽງຖືກ
    } else {
        clickedButton.classList.add('incorrect');
        if (incorrectSound) incorrectSound.play(); // ຫຼິ້ນສຽງຜິດ
        // Highlight the correct answer
        const optionButtons = optionsContainer.querySelectorAll('button');
        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }

    const optionButtons = optionsContainer.querySelectorAll('button');
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showResults() {
    questionBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreSpan.textContent = `${score} / ${quizQuestions.length}`;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }
