// Questions for each survey topic
const surveys = {
    "Healthy Lifestyle": [
        {
            question: "How many days per week do you exercise for at least 30 minutes?",
            options: ["Never", "1-2 days", "3-4 days", "5 or more days"]
        },
        {
            question: "How many hours do you sleep per night?",
            options: ["Less than 5 hours", "5-6 hours", "7-8 hours", "More than 8 hours"]
        },
        {
            question: "What is your main form of physical activity?",
            options: ["Walking or jogging", "Gym or strength training", "Sports (cricket, football, badminton, etc.)", "Yoga or home workouts", "I don’t do any regular activity"]
        },
        {
            question: "How many hours per day do you spend sitting (study, work, phone, etc.)?",
            options: ["Less than 4 hours", "4-6 hours", "6-8 hours", "More than 8 hours"]
        },
        {
            question: "How much daily recreational screen time do you have (phone, TV, gaming, social media)?",
            options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "More than 6 hours"]
        },
        {
            question: "Do you go to bed and wake up at roughly the same time every day?",
            options: ["Always", "Often", "Sometimes", "Rarely or never"]
        },
        {
            question: "How do you usually travel short distances (under 2 km)?",
            options: ["Walk", "Cycle", "Two-wheeler", "Car, auto or cab"]
        },
        {
            question: "How often do you feel stressed or overwhelmed in daily life?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"]
        },
        {
            question: "How often do you consume tobacco, alcohol or vaping products?",
            options: ["Never", "Occasionally (a few times a year)", "Weekly", "Daily"]
        },
        {
            question: "What is your biggest barrier to staying physically active?",
            options: ["Lack of time", "Lack of motivation", "Lack of facilities or space", "Health issues", "No barrier, I’m already active"]
        }
    ],
    "Health Awareness": [
        {
            question: "How would you rate your knowledge of disease prevention?",
            options: ["Very good", "Good", "Average", "Poor", "I have no idea"]
        },
        {
            question: "What is your main source of health information?",
            options: ["Doctors or healthcare workers", "Internet or search engines", "Social media or YouTube", "Family and friends", "TV, newspapers or magazines"]
        },
        {
            question: "How often do you go for a general health check-up?",
            options: ["Every year", "Every 2-3 years", "Only when I fall sick", "Never"]
        },
        {
            question: "Are you aware of the vaccinations recommended for your age group?",
            options: ["Yes, and I’m fully up to date", "Yes, but I’m not fully up to date", "I know a little", "No, I’m not aware"]
        },
        {
            question: "Which do you think is the biggest contributor to heart disease?",
            options: ["Unhealthy diet and lack of exercise", "Genetics only", "Age only", "Stress only", "Not sure"]
        },
        {
            question: "Do you know your normal blood pressure and blood sugar readings?",
            options: ["I know both", "I know only one", "I have checked before but don’t remember", "I have never checked"]
        },
        {
            question: "How often do you wash your hands with soap before eating?",
            options: ["Always", "Most of the time", "Sometimes", "Rarely"]
        },
        {
            question: "Which lifestyle diseases are you familiar with? (Select all that apply)",
            options: ["Diabetes", "Hypertension", "Obesity", "Heart disease", "None of these"],
            multiple: true
        },
        {
            question: "Do you think mental health is as important as physical health?",
            options: ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"]
        },
        {
            question: "Would you attend a free health awareness camp or program in your area?",
            options: ["Yes, definitely", "Maybe", "Only if it’s convenient", "No"]
        }
    ],
    "Nutrition & Diet": [
        {
            question: "How many meals do you usually eat per day?",
            options: ["1-2", "3", "4-5", "Irregular, it varies"]
        },
        {
            question: "How many servings of fruits and vegetables do you eat per day?",
            options: ["None", "1-2 servings", "3-4 servings", "5 or more servings"]
        },
        {
            question: "How often do you skip breakfast?",
            options: ["Never", "1-2 times a week", "3-5 times a week", "Almost every day"]
        },
        {
            question: "How often do you eat fast food or junk food (burgers, pizza, chips, packaged snacks)?",
            options: ["Rarely or never", "1-2 times a week", "3-5 times a week", "Daily"]
        },
        {
            question: "How many glasses of water do you drink per day?",
            options: ["Less than 4", "4-6", "7-8", "More than 8"]
        },
        {
            question: "How often do you drink sugary beverages (soda, packaged juice, energy drinks, sweetened tea or coffee)?",
            options: ["Never", "Few times a month", "Few times a week", "Daily"]
        },
        {
            question: "Do you read nutrition labels on packaged food before buying?",
            options: ["Always", "Sometimes", "Rarely", "Never"]
        },
        {
            question: "How often do you eat home-cooked meals?",
            options: ["Every meal", "Most meals", "About half of my meals", "Rarely, mostly outside food"]
        },
        {
            question: "Which best describes your diet?",
            options: ["Vegetarian", "Eggetarian", "Non-vegetarian", "Vegan", "Mixed or flexible"]
        },
        {
            question: "Do you take any dietary supplements (vitamins, protein powder, etc.)?",
            options: ["No", "Yes, prescribed by a doctor", "Yes, on my own choice", "Yes, on a trainer’s or friend’s advice"]
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

                const input = document.createElement("input");
                input.type = questions[i].multiple ? "checkbox" : "radio";
                input.name = "question" + i;
                input.value = questions[i].options[j];
                input.required = !questions[i].multiple && j === 0;

                label.appendChild(input);
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
                const selected = surveyForm.querySelectorAll('input[name="question' + i + '"]:checked');

                if (selected.length === 0) {
                    document.getElementById("surveyMessage").textContent = "Please select at least one answer for question " + (i + 1) + ".";
                    return;
                }

                if (questions[i].multiple) {
                    const selectedAnswers = [];
                    selected.forEach(function (option) {
                        selectedAnswers.push(option.value);
                    });
                    answers.push(selectedAnswers);
                } else {
                    answers.push(selected[0].value);
                }
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
