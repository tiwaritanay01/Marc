// Sample Data
const classes = [
    {name:"Mathematics", total:20, attended:18},
    {name:"Physics", total:15, attended:12},
    {name:"Chemistry", total:18, attended:16}
];

const history = [
    {date:"2025-09-20", subject:"Mathematics", status:"Present", duration:"50 min", attendance_marked :"Yes"},
    {date:"2025-09-20", subject:"Physics", status:"Absent", duration:"0 min", attendance_marked :"No"},
    {date:"2025-09-19", subject:"Chemistry", status:"Present", duration:"45 min", attendance_marked :"Yes"},
    {date:"2025-09-18", subject:"Mathematics", status:"Present", duration:"25 min", attendance_marked :"No"}
];

// Populate Class Cards
const classCards = document.getElementById("classCards");
let totalAttended=0, totalLectures=0;
classes.forEach(c=>{
    const card = document.createElement("div");
    card.className="card";
    const percent = Math.round(c.attended/c.total*100);
    card.innerHTML = `<h3>${c.name}</h3>
                      <p>Total Lectures: ${c.total}</p>
                      <p>Attended: ${c.attended}</p>
                      <p>Attendance: ${percent}%</p>
                      <div class="progress-bar">
                          <div class="progress" style="width:${percent}%">${percent}%</div>
                      </div>`;
    classCards.appendChild(card);
    totalAttended += c.attended;
    totalLectures += c.total;
});

// Overall Attendance
const overallPercent = Math.round(totalAttended/totalLectures*100);
document.getElementById("overallPercent").innerText = overallPercent+"%";
document.getElementById("overallProgress").style.width = overallPercent+"%";
document.getElementById("overallProgress").innerText = overallPercent+"%";

// Toggle Overall Attendance
const toggleBtn = document.getElementById("toggleBtn");
const overallDiv = document.getElementById("overallAttendance");
toggleBtn.addEventListener("click", ()=>{
    if(overallDiv.style.display==="none"){
        overallDiv.style.display="block";
        toggleBtn.innerText="Hide Overall Attendance";
    } else {
        overallDiv.style.display="none";
        toggleBtn.innerText="Show Overall Attendance";
    }
});

// Populate History Table
const historyTable = document.getElementById("historyTable");
historyTable.innerHTML = "";
history.forEach(h=>{
    const tr = document.createElement("tr");
    if (h.attendance_marked === "No") tr.classList.add("absent");
    tr.innerHTML = `<td>${h.date}</td>
                    <td>${h.subject}</td>
                    <td>${h.status}</td>
                    <td>${h.duration}</td>
                    <td>${h.attendance_marked}</td>`;
    historyTable.appendChild(tr);
});

// Attendance by Date
const attendanceByDate = {
    "2025-09-01": { "attended": 0, "total": 4 },
    "2025-09-02": { "attended": 0, "total": 4 },
    "2025-09-03": { "attended": 0, "total": 4 },
    "2025-09-04": { "attended": 0, "total": 4 },
    "2025-09-05": { "attended": 0, "total": 4 },
    "2025-09-06": { "attended": 0, "total": 4 },
    "2025-09-07": { "attended": 0, "total": 4 },
    "2025-09-08": { "attended": 0, "total": 4 },
    "2025-09-09": { "attended": 0, "total": 4 },
    "2025-09-10": { "attended": 0, "total": 4 },
    "2025-09-11": { "attended": 0, "total": 4 },
    "2025-09-12": { "attended": 0, "total": 4 },
    "2025-09-13": { "attended": 0, "total": 4 },
    "2025-09-14": { "attended": 0, "total": 4 },
    "2025-09-15": { "attended": 0, "total": 4 },
    "2025-09-16": { "attended": 0, "total": 4 },
    "2025-09-17": { "attended": 0, "total": 4 },
    "2025-09-18": { "attended": 4, "total": 4 },
    "2025-09-19": { "attended": 3, "total": 4 },
    "2025-09-20": { "attended": 1, "total": 4 },
    "2025-09-21": { "attended": 0, "total": 4 },
    "2025-09-22": { "attended": 0, "total": 4 },
    "2025-09-23": { "attended": 0, "total": 4 },
    "2025-09-24": { "attended": 0, "total": 4 },
    "2025-09-25": { "attended": 0, "total": 4 },
    "2025-09-26": { "attended": 0, "total": 4 },
    "2025-09-27": { "attended": 0, "total": 4 },
    "2025-09-28": { "attended": 0, "total": 4 },
    "2025-09-29": { "attended": 0, "total": 4 },
    "2025-09-30": { "attended": 0, "total": 4 },
    "2025-09-31": { "attended": 0, "total": 4 }
};

// Calendar (Full Month)
const calendar = document.getElementById("calendar");
const calendarInfo = document.getElementById("calendarInfo");

for (let d = 1; d <= 31; d++) {
    const dayStr = d.toString().padStart(2, '0');
    const date = `2025-09-${dayStr}`;
    const data = attendanceByDate[date] || {attended:0, total:4};

    const div = document.createElement("div");
    div.style.padding = "15px";
    div.style.borderRadius = "8px";
    div.style.textAlign = "center";
    div.style.cursor = "pointer";
    div.innerHTML = `<strong>${d}</strong>`;

    if (data.attended === data.total) {
        div.style.background = "#4CAF50"; div.style.color = "white";
    } else if (data.attended === 0) {
        div.style.background = "#f44336"; div.style.color = "white";
    } else {
        div.style.background = "#ffeb3b"; div.style.color = "#333";
    }

    div.addEventListener("click", ()=>{
        calendarInfo.innerText = `${date}: Attended ${data.attended} out of ${data.total} lectures (${Math.round((data.attended/data.total)*100)}%)`;
    });

    calendar.appendChild(div);
}
