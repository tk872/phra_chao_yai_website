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
