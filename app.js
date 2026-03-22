const API_KEY = "AIzaSyB-fOdB2NuPcqKhJ2gvYzCPflR5jYVcC7Y";

async function askAI() {
    const inputField = document.getElementById('userInput');
    const responseArea = document.getElementById('responseArea');
    const userInput = inputField.value;

    if (!userInput) return;

    responseArea.innerHTML = "Processing your request... 🇿🇲";

    try {
        // We are using a simpler URL to avoid strict security blocks
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are Teacher Chenjela, an expert Zambian educator. Explain this simply: ${userInput}` }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            // This shows us EXACTLY what Google is complaining about
            responseArea.innerHTML = `⚠️ Google Error: ${data.error.message}. <br><br> <strong>Tip:</strong> Go to Google AI Studio and make sure your key is "Unrestricted".`;
            return;
        }

        const aiText = data.candidates[0].content.parts[0].text;
        responseArea.innerHTML = `<div style="text-align:left;">${aiText.replace(/\n/g, '<br>')}</div>`;
        inputField.value = ""; 

    } catch (error) {
        responseArea.innerHTML = "Check your internet connection and try again.";
    }
}

// Keeping the Grid function simple so it never fails
function generateGrid() {
    const topic = document.getElementById('topicInput').value;
    const responseArea = document.getElementById('responseArea');
    if (!topic) return alert("Enter a topic!");
    responseArea.innerHTML = `<div style="background:white;color:black;padding:10px;border-radius:8px;"><h4>CBC Grid: ${topic}</h4><p>Week 1: Intro to ${topic}<br>Week 2: Practice</p></div>`;
}
