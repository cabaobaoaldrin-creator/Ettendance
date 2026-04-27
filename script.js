document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const attendanceData = {
        name: document.getElementById('studentName').value,
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