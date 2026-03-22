// --- THE KEY MANAGER ---
let API_KEY = localStorage.getItem('chenjela_key');

// Force reset if the user adds ?reset=true to the URL
if (window.location.search.includes('reset=true')) {
    localStorage.removeItem('chenjela_key');
    API_KEY = null;
}

if (!API_KEY) {
    API_KEY = prompt("Enter your Google API Key to activate Chenjela:");
    if (API_KEY) {
        localStorage.setItem('chenjela_key', API_KEY.trim());
    }
}

// --- THE AI ENGINE ---
async function askAI() {
    const inputField = document.getElementById('userInput');
    const responseArea = document.getElementById('responseArea');
    const userInput = inputField.value;

    if (!userInput) return;
    if (!API_KEY) {
        alert("Please refresh and enter your key.");
        return;
    }

    responseArea.innerHTML = "Consulting the syllabus... 🇿🇲";

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `You are Teacher Chenjela, an expert Zambian educator. Answer using the Zambian CBC syllabus (Grade 10-12 or Form 1-4). Use Kwacha for money examples and local Zambian context. User asks: ${userInput}` 
                    }] 
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            responseArea.innerHTML = "⚠️ Error: " + data.error.message;
            if(data.error.message.includes("API_KEY_INVALID")) {
                localStorage.removeItem('chenjela_key');
                responseArea.innerHTML += "<br>Invalid Key. Refresh to try again.";
            }
        } else {
            const aiText = data.candidates[0].content.parts[0].text;
            responseArea.innerHTML = aiText.replace(/\n/g, '<br>');
            inputField.value = ""; 
        }

    } catch (error) {
        responseArea.innerHTML = "⚠️ Connection failed. Check your network or API key.";
        console.error(error);
    }
}
