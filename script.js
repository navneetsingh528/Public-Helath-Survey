// =====================================================
// HealthSurvey - script.js
// Simple JavaScript for a college project
// =====================================================


// -----------------------------------------------------
// 1. NAVBAR SHADOW WHEN PAGE IS SCROLLED
// -----------------------------------------------------
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    // window.scrollY = how many pixels the page has been scrolled
    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");     // CSS adds a shadow
    } else {
        navbar.classList.remove("scrolled");
    }
});


// -----------------------------------------------------
// 2. HIGHLIGHT THE ACTIVE NAV LINK WHILE SCROLLING
// -----------------------------------------------------
const navLinks = document.querySelectorAll(".nav-links a");
const sectionIds = ["home", "surveys", "features", "about"];

window.addEventListener("scroll", function () {
    let current = "home";

    // Find the last section whose top has already passed the top of the screen
    for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (window.scrollY >= section.offsetTop - 120) {
            current = sectionIds[i];
        }
    }

    // Give the "active" class only to the matching link
    navLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// -----------------------------------------------------
// 3. SURVEY QUESTIONS (stored in an object)
// -----------------------------------------------------
// Key = survey name (same as the <h3> title in each card)
// Value = list of questions, each with its own options
const surveys = {
    "Healthy Lifestyle": [
        {
            question: "How many days a week do you exercise?",
            options: ["0-1 days", "2-3 days", "4-5 days", "Everyday"]
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
            options: ["Daily", "Few times a week", "Rarely", "Never"]
        },
        {
            question: "How often do you eat junk food?",
            options: ["Daily", "Few times a week", "Once a week", "Rarely"]
        }
    ]
};


// -----------------------------------------------------
// 4. OPEN THE SURVEY POPUP WHEN "Take Survey" IS CLICKED
// -----------------------------------------------------
const cardLinks = document.querySelectorAll(".card-link");

cardLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();   // stop the link from jumping to #survey-info

        // Go up to the card, then find its title (e.g. "Healthy Lifestyle")
        const card = link.closest(".survey-card");
        const title = card.querySelector("h3").textContent;

        openSurvey(title);
    });
});


// Builds the popup and shows it on the screen
function openSurvey(title) {
    const questions = surveys[title];

    // Create the dark background (overlay)
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    // Start writing the HTML for the popup box
    let html = '<div class="modal">';
    html += '<button class="modal-close" id="closeBtn">×</button>';
    html += "<h2>" + title + " Survey</h2>";
    html += '<form id="surveyForm">';

    // Loop through every question and create radio buttons
    for (let i = 0; i < questions.length; i++) {
        html += '<div class="question">';
        html += "<p>" + (i + 1) + ". " + questions[i].question + "</p>";

        for (let j = 0; j < questions[i].options.length; j++) {
            html += '<label class="option">';
            html += '<input type="radio" name="q' + i + '" value="' + questions[i].options[j] + '"> ';
            html += questions[i].options[j];
            html += "</label>";
        }

        html += "</div>";
    }

    html += '<p class="error" id="errorMsg"></p>';
    html += '<button type="submit" class="btn">Submit Survey</button>';
    html += "</form>";
    html += "</div>";

    overlay.innerHTML = html;
    document.body.appendChild(overlay);   // show it on the page

    // Close button
    document.getElementById("closeBtn").addEventListener("click", function () {
        overlay.remove();
    });

    // Clicking the dark area outside the box also closes it
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            overlay.remove();
        }
    });

    // When the form is submitted
    document.getElementById("surveyForm").addEventListener("submit", function (event) {
        event.preventDefault();   // stop the page from reloading
        submitSurvey(title, questions, overlay);
    });
}


// -----------------------------------------------------
// 5. CHECK ANSWERS, SAVE THEM AND SHOW THANK YOU MESSAGE
// -----------------------------------------------------
function submitSurvey(title, questions, overlay) {
    const answers = [];

    for (let i = 0; i < questions.length; i++) {
        // Find the radio button that is selected for this question
        const selected = document.querySelector('input[name="q' + i + '"]:checked');

        // Validation: every question must be answered
        if (selected === null) {
            document.getElementById("errorMsg").textContent =
                "Please answer question " + (i + 1) + " before submitting.";
            return;   // stop here
        }

        answers.push(selected.value);
    }

    // Save the answers in the browser (localStorage keeps data after refresh)
    const saved = JSON.parse(localStorage.getItem("surveyResponses")) || [];
    saved.push({ survey: title, answers: answers, time: new Date().toLocaleString() });
    localStorage.setItem("surveyResponses", JSON.stringify(saved));

    // Replace the form with a thank-you message
    overlay.querySelector(".modal").innerHTML =
        '<div class="thank-you">' +
        "<h2>Thank You! ✓</h2>" +
        "<p>Your response to the " + title + " survey has been recorded.</p>" +
        '<button class="btn" id="doneBtn">Close</button>' +
        "</div>";

    document.getElementById("doneBtn").addEventListener("click", function () {
        overlay.remove();
    });
}


// -----------------------------------------------------
// 6. CLOSE THE POPUP WITH THE ESCAPE KEY
// -----------------------------------------------------
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        const overlay = document.querySelector(".modal-overlay");
        if (overlay) {
            overlay.remove();
        }
    }
});


// -----------------------------------------------------
// 7. BACK TO TOP BUTTON
// -----------------------------------------------------
const topBtn = document.createElement("button");
topBtn.id = "backToTop";
topBtn.textContent = "↑";
document.body.appendChild(topBtn);

// Show the button only after scrolling down
window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

// Scroll smoothly to the top when clicked
topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
