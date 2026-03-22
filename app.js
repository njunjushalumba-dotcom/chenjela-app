// This version keeps your key safe from GitHub's scanners
let API_KEY = localStorage.getItem('chenjela_key');

// If there is no key saved, it will ask you for it once
if (!API_KEY) {
    API_KEY = prompt("Please enter your Google API Key to activate Chenjela:");
    if (API_KEY) {
        localStorage.setItem('chenjela_key', API_KEY);
    }
}

async function askAI() {
    const inputField = document.getElementById('userInput');
    const responseArea = document.getElementById('responseArea');
    const userInput = inputField.value;

    if (!userInput || !API_KEY) return;

    responseArea.innerHTML = "Teacher Chenjela is typing... 🇿🇲";

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are Teacher Chenjela, a Zambian tutor. Use Kwacha and CBC examples. Question: ${userInput}` }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            responseArea.innerHTML = "⚠️ API Error. Try clearing your browser data and entering the new key.";
            return;
        }

        const aiText = data.candidates[0].content.parts[0].text;
        responseArea.innerHTML = aiText.replace(/\n/g, '<br>');
        inputField.value = ""; 

    } catch (error) {
        responseArea.innerHTML = "Connection failed. Please check your internet.";
    }
}

function generateGrid() {
    const topic = document.getElementById('topicInput').value;
    const responseArea = document.getElementById('responseArea');
    responseArea.innerHTML = `<div style="background:white;color:black;padding:10px;border-radius:8px;"><h4>Grid: ${topic}</h4><p>Contact for full CBC scheme.</p></div>`;
}
