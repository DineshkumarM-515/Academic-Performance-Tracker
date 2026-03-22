const semCredits = {
    1:22,
    2:23,
    3:23,
    4:21,
    5:22,
    6:22,
    7:19,
    8:10
};

function showSem(num){
    document.querySelectorAll('.sem-section').forEach(s => {
        s.style.display = "none";
    });

    if(num === 'cgpa'){
        document.getElementById("cgpa").style.display = "block";
    } else {
        document.getElementById(`sem${num}`).style.display = "block";
    }
}


const points ={
    "O":10,
    "A+":9,
    "A":8,
    "B+":7,
    "B":6,
    "C":5,
    "RA":0
}

function calculateGPA(sem){
let totalCredit = 0;
let totalPoints = 0;

let subjects = document.querySelectorAll(`#sem${sem} select`);

subjects.forEach(sel => {
    let gp = points[sel.value];
    let credit = parseInt(sel.getAttribute("data-credit"));

    totalPoints += gp*credit;
    totalCredit += credit;
});

let gpa = (totalPoints/totalCredit).toFixed(4);

document.querySelector(`#sem${sem} .result`).innerHTML = 
      `<h2>Your GPA for Semester ${sem}: ${gpa}</h2>`;


        localStorage.setItem(`sem${sem}_gpa`,gpa);
        localStorage.setItem(`sem${sem}_credits`,semCredits[sem]);

}   

let addedSemesters = []; // Global array to track added semesters

function addCGPAField() {
    let container = document.getElementById("cgpa-inputs");
    let sem = container.children.length + 1;

    if (addedSemesters.includes(sem)) {
        alert(`Semester ${sem} is already added.`);
        return;
    }

    addedSemesters.push(sem);

    container.insertAdjacentHTML('beforeend', `
        <div class="sub-card" id="sem${sem}-card">
            <label>Semester ${sem} GPA</label>
            <input type="number" id="cg${sem}" value="" step="0.01">
            <button onclick="removeSemester(${sem})">Remove</button>
        </div>
    `);
}

function removeSemester(sem){
    document.getElementById(`sem${sem}-card`).remove();
    addedSemesters = addedSemesters.filter(s => s !== sem);
    localStorage.removeItem(`manual_sem${sem}_gpa`);
}

function resetCGPAFields() {
    let container = document.getElementById("cgpa-inputs");
    container.innerHTML = ""; 
    localStorage.clear(); 
    document.getElementById("cgpa-result").innerHTML = ""; 
}


function calculateCGPA() {
    let totalWeightedGPA = 0;
    let totalCredits = 0;
    let count = 0;

    addedSemesters.forEach(sem => {
        let input = document.getElementById(`cg${sem}`);
        let gpa = parseFloat(input.value);
        let credits = semCredits[sem];

        if (!isNaN(gpa) && gpa >= 0 && gpa <= 10 && credits) {
            totalWeightedGPA += gpa * credits;
            totalCredits += credits;
            count++;
        }
    });

    /*let manualInputs = document.querySelectorAll("#cgpa-inputs input");
    manualInputs.forEach(input => {
        let sem = input.id.replace("cg","");
        let gpa = parseFloat(input.value);
        let credits = semCredits[sem];

        if(!isNaN(gpa) && credits && gpa >= 0 && gpa <= 10 && credits){
            totalWeightedGPA += gpa * credits;
            totalCredits += credits;
            count++;
        }
    });*/


    if(count < 2){
        document.getElementById("cgpa-result").innerHTML = 
            "<h2>Please provide GPA for at least 2 semesters</h2>";
        return;
    }

    let cgpa = (totalWeightedGPA/totalCredits).toFixed(4);
    document.getElementById("cgpa-result").innerHTML = 
        `<h2>Your Overall CGPA is ${cgpa}</h2>`;
}

function resetCGPAtab(){
    let container = document.getElementById("cgpa-inputs");
    container.innerHTML = "";
    addedSemesters = [];
    document.getElementById("cgpa-result").innerHTML = "";
    alert("CGPA Tab has been reset!");
}

