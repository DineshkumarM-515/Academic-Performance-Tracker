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

function addCGPAField() {
    let container = document.getElementById("cgpa-inputs");
    let sem = container.children.length + 1;

    let gpa = localStorage.getItem(`sem${sem}_gpa`) || "";

    container.innerHTML += `
        <div class="sub-card">
            <label>Semester ${sem} GPA</label>
            <input type="number" id="cg${sem}" value="${gpa}" step="0.01">
        </div>
    `;
}



function calculateCGPA() {
    let totalWeightedGPA = 0;
    let totalCredits = 0;
    let count = 0;

    for(let sem=1;sem<=8;sem++){
        let gpa = localStorage.getItem(`sem${sem}_gpa`);
        let credits = localStorage.getItem(`sem${sem}_credits`);

        if(gpa && credits){
            totalWeightedGPA += parseFloat(gpa)*parseInt(credits);
            totalCredits += parseInt(credits);
            count++;
        }
        

    }

    if(count < 2){
        document.getElementById("cgpa-result").innerHTML = 
            "<h2>Please Calculate atleast 2 semesters </h2>";
        return;
    }

    let cgpa = (totalWeightedGPA/totalCredits).toFixed(4);
    document.getElementById("cgpa-result").innerHTML = 
        `<h2>Your Overall CGPA is ${cgpa}</h2>`;
}

