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
    "2025-09-01 Monday": { "attended": 3, "total": 4 },
    "2025-09-02 tuesday" : { "attended": 4, "total": 4 },
    "2025-09-03 wednesday": { "attended": 2, "total": 4 },
    "2025-09-04 thursday": { "attended": 4, "total": 4 },
    "2025-09-05 friday": { "attended": 1, "total": 4 },
    "2025-09-06 saturday": { "attended": 0, "total": 4 },
    "2025-09-07 sunday": { "attended": 0, "total": 4 },
    "2025-09-08 Monday": { "attended": 4, "total": 4 },
    "2025-09-09 tuesday": { "attended": 3, "total": 4 },
    "2025-09-10 wednesday": { "attended": 0, "total": 4 },
    "2025-09-11 thursday": { "attended": 4, "total": 4 },
    "2025-09-12 friday": { "attended": 4, "total": 4 },
    "2025-09-13 saturday": { "attended": 0, "total": 4 },
    "2025-09-14 Sunday": { "attended": 0, "total": 4 },
    "2025-09-15 Monday": { "attended": 0, "total": 4 },
    "2025-09-16 tuesday": { "attended": 3, "total": 4 },
    "2025-09-17 wednesday": { "attended": 2, "total": 4 },
    "2025-09-18 thursday": { "attended": 4, "total": 4 },
    "2025-09-19 friday": { "attended": 3, "total": 4 },
    "2025-09-20 saturday": { "attended": 0, "total": 4 },
    "2025-09-21 sunday": { "attended": 0, "total": 4 },
    "2025-09-22 monday": { "attended": 0, "total": 4 },
    "2025-09-23 tuesday": { "attended": 0, "total": 4 },
    "2025-09-24 wednesday": { "attended": 0, "total": 4 },
    "2025-09-25 thursday": { "attended": 0, "total": 4 },
    "2025-09-26 friday": { "attended": 0, "total": 4 },
    "2025-09-27 saturday": { "attended": 0, "total": 4 },
    "2025-09-28 sunday": { "attended": 0, "total": 4 },
    "2025-09-29 monday": { "attended": 0, "total": 4 },
    "2025-09-30 tuesday": { "attended": 0, "total": 4 }
};

// Holidays (example)
const holidays = ["2025-09-10", "2025-09-15", "2025-09-28"];

// Calendar
const calendar = document.getElementById("calendar");
const calendarInfo = document.getElementById("calendarInfo");

function getDayOfWeek(dateStr){
    const parts = dateStr.split("-");
    const date = new Date(parts[0], parts[1]-1, parts[2]);
    return date.getDay(); // 0=Sun,6=Sat
}

for(let d=1; d<=30; d++){
    const dayStr = d.toString().padStart(2,'0');
    const date = `2025-09-${dayStr}`;

    // Find the matching entry in attendanceByDate
    let data = {attended:0, total:4};
    for(const key in attendanceByDate){
        if(key.startsWith(date)){
            data = attendanceByDate[key];
            break;
        }
    }

    const div = document.createElement("div");
    div.style.padding = "10px";
    div.style.borderRadius = "8px";
    div.style.textAlign = "center";
    div.style.cursor = "pointer";

    // Get day of week
    const dayOfWeek = getDayOfWeek(date);
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const dayName = dayNames[dayOfWeek];

    // Show day, day name, and attendance
    div.innerHTML = `<strong>${d}</strong><br><span style="font-size:12px">${dayName}</span><br><span style="font-size:12px">${data.attended}/${data.total}</span>`;

    // Weekend highlight (border only)
    if(dayOfWeek === 0 || dayOfWeek === 6) div.classList.add("weekend");

    // Holiday
    if(holidays.includes(date)){
        div.classList.add("holiday");
    } else {
        // Attendance colors
        if(data.attended === data.total){
            div.style.background = "#4CAF50"; div.style.color = "white"; // full attendance → green
        } else if(data.attended === 0){
            div.style.background = "#f44336"; div.style.color = "white"; // absent → red
        } else {
            div.style.background = "#ffeb3b"; div.style.color = "#333"; // partial → yellow
        }
    }

    div.title = `${date}: Attended ${data.attended}/${data.total}`;
    div.addEventListener("click", ()=>{
        calendarInfo.innerText = `${date}: Attended ${data.attended} out of ${data.total} lectures (${Math.round(data.attended/data.total*100)}%)`;
    });

    calendar.appendChild(div);
}
