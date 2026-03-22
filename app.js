// 1. ZAMBIAN TEACHER CONFIGURATION
const ZAMBIAN_CONTEXT = {
    currency: "Zambian Kwacha (K)",
    syllabuses: {
        senior: "ECZ Senior Secondary (Grades 10-12)",
        cbc: "Zambian National Competency-Based Curriculum (Forms 1-4)"
    }
};

// 2. THE AI FUNCTION (Ask Teacher Chenjela)
async function askAI() {
    const input = document.getElementById('userInput').value;
    const responseArea = document.getElementById('responseArea');
    
    if (!input) return alert("Please enter a question!");
    
    responseArea.innerHTML = "Thinking like a Zambian teacher... 🇿🇲";

    // This is where the magic happens - it tells the AI to stay Zambian
    const finalPrompt = `Context: You are a Zambian teacher. Use ${ZAMBIAN_CONTEXT.currency}. 
    Follow ${ZAMBIAN_CONTEXT.syllabuses.cbc}. Question: ${input}`;

    try {
        // This is a placeholder for your Google Gemini connection
        // We will add your API key here once you are ready
        responseArea.innerHTML = "Success! (AI Connection is ready to be activated with your key).";
    } catch (error) {
        responseArea.innerHTML = "Oh no! Something went wrong. Check your internet.";
    }
}

// 3. TEACHER'S GRID GENERATOR
function generateGrid() {
    const topic = document.getElementById('topicInput').value;
    const responseArea = document.getElementById('responseArea');
    
    if (!topic) return alert("Enter a topic for the grid!");

    let gridHTML = `<h4>CBC Scheme for: ${topic}</h4>
    <table border="1" style="width:100%; border-collapse: collapse; font-size: 12px;">
        <tr style="background: #f5b400; color: #0a0f1e;">
            <th>Week</th><th>Topic</th><th>Competency</th>
        </tr>
        <tr><td>1-2</td><td>${topic}</td><td>Student explains ${topic} in local context</td></tr>
        <tr><td>3-4</td><td>Application</td><td>Applying ${topic} to Zambian industry</td></tr>
    </table>`;
    
    responseArea.innerHTML = gridHTML;
}
