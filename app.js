const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

var questions = [
    {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        name: "name",
        type: "input",
        message: "Please input the employee's name.",
    },
    {
        name: "id",
        type: "input",
        message: "Please enter the Employee's ID number.",
    },
    {
        name: "email",
        type: "input",
        message: "Please input the employee's email address.",
    },
    {
        name: "officeNumber",
        type: "input",
        message: "Please enter the Manager's number. (Enter as xxx-xxx-xxxx) (skip if not applicable)",
    },
    {
        name: "gitHub",
        type: "input",
        message: "Please enter the Engineer's GitHub link. (Enter as www.______.com) (skip if not applicable)",
    },
    {
        name: "school",
        type: "input",
        message: "Please enter the Intern's school name. (skip if not applicable)",
    },
    {
        name: "more",
        type: "confirm",
        message: "Do you have another employee you would like to add?",
    }
]

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

employeeArray = [];

function init() {
    const askQuestions = () => {
        inquirer.prompt(questions).then((answer) => {
            if (answer.role === "Manager") {
                const newEmployee = new Manager(
                    answer.name,
                    answer.id,
                    answer.email,
                    answer.officeNumber
                );
                employeeArray.push(newEmployee);
            } else if (answer.role === "Engineer") {
                const newEmployee = new Engineer(
                    answer.name,
                    answer.id,
                    answer.email,
                    answer.gitHub
                );
                employeeArray.push(newEmployee);
            } else if (answer.role === "Intern") {
                const newEmployee = new Intern(
                    answer.name,
                    answer.id,
                    answer.email,
                    answer.school
                );
                employeeArray.push(newEmployee)
            }
            if (answer.more === true) {
                askQuestions();
            } else {
            const renderedHTML = render(employeeArray);
            fs.writeFile(outputPath, renderedHTML, {}, (err) =>
            err ? console.log(err) : console.log("File created successfully!")
            )}
        })
    }
    askQuestions();
}

init();