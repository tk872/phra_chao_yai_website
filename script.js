const questions = [
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
    // ເພີ່ມຄຳຖາມອື່ນໆອີກ
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const resultBox = document.getElementById('result-box');
const scoreSpan = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const questionBox = document.getElementById('question-box');

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = ''; // ລຶບທາງເລືອກເກົ່າ

        q.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, q.answer);
            optionsContainer.appendChild(button);
        });
        nextButton.style.display = 'none'; // ເຊື່ອງປຸ່ມຕໍ່ໄປຈົນກວ່າຈະເລືອກຄໍາຕອບ
    } else {
        showResults();
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    // ເມື່ອເລືອກຄຳຕອບແລ້ວ, ໃຫ້ເຊື່ອງປຸ່ມຕ່າງໆ ແລ້ວສະແດງປຸ່ມ Next
    const optionButtons = optionsContainer.querySelectorAll('button');
    optionButtons.forEach(button => {
        button.disabled = true; // ປິດການໃຊ້ງານປຸ່ມອື່ນໆ
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = '#aaffaa'; // ສີຂຽວສໍາລັບຄໍາຕອບທີ່ຖືກຕ້ອງ
        } else if (button.textContent === selectedOption) {
            button.style.backgroundColor = '#ffaaaa'; // ສີແດງສໍາລັບຄໍາຕອບທີ່ຜິດ
        }
    });
    nextButton.style.display = 'block'; // ສະແດງປຸ່ມຕໍ່ໄປ
}

function showResults() {
    questionBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreSpan.textContent = score;
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    loadQuestion();
    // ລຶບສີພື້ນຫຼັງທີ່ຖືກ/ຜິດ ກ່ອນຈະໂຫຼດຄໍາຖາມໃໝ່
    const optionButtons = optionsContainer.querySelectorAll('button');
    optionButtons.forEach(button => {
        button.style.backgroundColor = '#e0e0e0';
        button.disabled = false;
    });
};

restartButton.onclick = () => {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.style.display = 'none';
    questionBox.style.display = 'block';
    loadQuestion();
};

// ເລີ່ມເກມ
loadQuestion();
