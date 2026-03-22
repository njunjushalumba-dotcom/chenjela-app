const API_KEY = "AIzaSyB-fOdB2NuPcqKhJ2gvYzCPflR5jYVcC7Y";
const FREE_LIMIT = 5;

async function askAI() {
    const inputField = document.getElementById('userInput');
    const userInput = inputField.value;
    const responseArea = document.getElementById('responseArea');

    if (!userInput) return;

    let usage = localStorage.getItem('chenjela_usage') || 0;
    if (parseInt(usage) >= FREE_LIMIT) {
        responseArea.innerHTML = "Free Limit Reached. Upgrade to Premium for K150!";
        return;
    }

    responseArea.innerHTML = "Teacher Chenjela is thinking... 🇿🇲";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are Teacher Chenjela. Answer this for a Zambian student: ${userInput}` }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            // This button will let you "Try Again" if there is an error
            responseArea.innerHTML = `Error: ${data.error.message} <br><button onclick="location.reload()" style="background:var(--gold); color:black; margin-top:10px;">Try Again</button>`;
            return;
        }

        const aiText = data.candidates[0].content.parts[0].text;
        localStorage.setItem('chenjela_usage', parseInt(usage) + 1);
        responseArea.innerHTML = aiText;
        inputField.value = ""; // Clears the box so you can type again

    } catch (error) {
        responseArea.innerHTML = "Connection lost. Tap to refresh. <br><button onclick="location.reload()">Refresh</button>";
    }
}
