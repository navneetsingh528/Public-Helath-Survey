// Questions for each survey topic
const surveys = {
    "Healthy Lifestyle": [
        {
            question: "How many days a week do you exercise?",
            options: ["0-1 days", "2-3 days", "4-5 days", "Every day"]
        },
        {
            question: "How many hours do you sleep per night?",
            options: ["Less than 5", "5-6", "7-8", "More than 8"]
        },
        {
            question: "How many hours do you spend on screens daily?",
            options: ["Less than 2", "2-4", "5-7", "More than 7"]
        }
    ],
    "Health Awareness": [
        {
            question: "How often do you get a health check-up?",
            options: ["Every 6 months", "Once a year", "Rarely", "Never"]
        },
        {
            question: "Do you know the basic steps to prevent common diseases?",
            options: ["Yes, very well", "Somewhat", "Not really", "No"]
        },
        {
            question: "Where do you mostly get health information?",
            options: ["Doctors", "Internet", "Family and friends", "Social media"]
        }
    ],
    "Nutrition & Diet": [
        {
            question: "How many meals do you eat per day?",
            options: ["1-2", "3", "4-5", "More than 5"]
        },
        {
            question: "How often do you eat fruits and vegetables?",
            options: ["Daily", "A few times a week", "Rarely", "Never"]
        },
        {
            question: "How often do you eat junk food?",
            options: ["Daily", "A few times a week", "Once a week", "Rarely"]
        }
    ]
};

// This code runs only on the survey page
const surveyForm = document.getElementById("surveyForm");

if (surveyForm) {
    const topic = new URLSearchParams(window.location.search).get("topic");
    const questions = surveys[topic];
    const title = document.getElementById("surveyTitle");
    const questionList = document.getElementById("questionList");

    if (questions) {
        title.textContent = topic + " Survey";

        // Add each question and its answer choices to the form
        for (let i = 0; i < questions.length; i++) {
            const questionBox = document.createElement("fieldset");
            questionBox.className = "survey-question";

            const questionTitle = document.createElement("legend");
            questionTitle.textContent = (i + 1) + ". " + questions[i].question;
            questionBox.appendChild(questionTitle);

            for (let j = 0; j < questions[i].options.length; j++) {
                const label = document.createElement("label");
                label.className = "survey-option";

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "question" + i;
                radio.value = questions[i].options[j];
                radio.required = true;

                label.appendChild(radio);
                label.appendChild(document.createTextNode(" " + questions[i].options[j]));
                questionBox.appendChild(label);
            }

            questionList.appendChild(questionBox);
        }

        // Save answers when the form is submitted
        surveyForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const answers = [];

            for (let i = 0; i < questions.length; i++) {
                const selected = surveyForm.querySelector('input[name="question' + i + '"]:checked');
                answers.push(selected.value);
            }

            const savedResponses = JSON.parse(localStorage.getItem("surveyResponses") || "[]");
            savedResponses.push({
                survey: topic,
                answers: answers,
                time: new Date().toLocaleString()
            });
            localStorage.setItem("surveyResponses", JSON.stringify(savedResponses));

            document.getElementById("surveyMessage").textContent = "Thank you! Your answers have been recorded.";
            surveyForm.reset();
        });
    } else {
        title.textContent = "Survey not found";
        surveyForm.remove();
    }
}
