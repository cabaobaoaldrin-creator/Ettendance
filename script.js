// 1. Handle Attendance Submission
document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const attendanceData = {
        name: document.getElementById('studentName').value,
        usn: document.getElementById('studentUSN').value,
        gradeSection: document.getElementById('gradeSection').value,
        status: document.getElementById('status').value,
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attendanceData)
        });

        if (response.ok) {
            document.getElementById('message').innerText = "Attendance recorded!";
            document.getElementById('attendanceForm').reset();
        }
    } catch (err) {
        document.getElementById('message').innerText = "Error connecting to server.";
    }
});

// 2. Handle Admin Search
document.getElementById('viewRecordsBtn').addEventListener('click', async () => {
    const searchDate = document.getElementById('searchDate').value;
    const listContainer = document.getElementById('attendanceList');
    
    if (!searchDate) {
        alert("Please select a date first.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/attendance?date=${searchDate}`);
        const records = await response.json();

        listContainer.innerHTML = ""; // Clear previous results

        if (records.length === 0) {
            listContainer.innerHTML = "<p style='text-align:center;'>No records found.</p>";
            return;
        }

        records.forEach(rec => {
            const item = document.createElement('div');
            item.className = "record-item";
            item.innerHTML = `
                <strong>${rec.name}</strong> <small>(${rec.usn})</small><br>
                <span>${rec.gradeSection}</span> — 
                <span class="status-tag">${rec.status}</span>
            `;
            listContainer.appendChild(item);
        });
    } catch (err) {
        listContainer.innerText = "Error loading records.";
    }
});
