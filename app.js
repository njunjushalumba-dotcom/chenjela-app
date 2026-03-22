// TEACHER CHENJELA BRAIN 🇿🇲
async function askAI() {
    const input = document.getElementById('userInput').value;
    const responseArea = document.getElementById('responseArea');
    
    if (!input) return;
    
    responseArea.innerHTML = "Thinking in Zambian context... 🇿🇲";

    // This connects to the rules we set for Kwacha and CBC
    setTimeout(() => {
        responseArea.innerHTML = "<strong>Teacher Chenjela:</strong> I'm ready! Once we paste your Google API key here, I will answer all your Zambian syllabus questions.";
    }, 1000);
}

// CBC GRID GENERATOR
function generateGrid() {
    const topic = document.getElementById('topicInput').value;
    const responseArea = document.getElementById('responseArea');
    
    if (!topic) return alert("Please enter a topic first!");

    responseArea.innerHTML = `
        <div style="background: white; color: black; padding: 10px; border-radius: 8px; margin-top: 10px;">
            <h4 style="margin:0;">CBC Scheme: ${topic}</h4>
            <table border="1" style="width:100%; border-collapse: collapse; margin-top:10px; font-size: 12px;">
                <tr style="background: #eee;"><th>Week</th><th>Competency</th></tr>
                <tr><td>1</td><td>Understand ${topic}</td></tr>
                <tr><td>2</td><td>Local application</td></tr>
            </table>
        </div>`;
}
