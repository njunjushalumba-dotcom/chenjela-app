// --- THE KEY MANAGER ---
let API_KEY = localStorage.getItem('chenjela_key');

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

// --- NAVIGATION LOGIC ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
}

// --- THE AI ENGINE ---
async function askAI() {
    const inputField = document.getElementById('userInput');
    const responseArea = document.getElementById('responseArea');
    const userInput = inputField.value;

    if (!userInput) return;
    if (!API_KEY) {
        alert("Enter your key first!");
        return;
    }

    responseArea.innerHTML = "Consulting the Zambian CBC Syllabus... 🇿🇲";

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `Context: Zambian Teacher Assistant. Use Grade 10-12 old syllabus and Form 1-4 CBC. Mention Zambian locations/Kwacha. User: ${userInput}` 
                    }] 
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            responseArea.innerHTML = "⚠️ API Error. Please check your key.";
        } else {
            const aiText = data.candidates[0].content.parts[0].text;
            responseArea.innerHTML = aiText.replace(/\n/g, '<br>');
            inputField.value = ""; 
        }

    } catch (error) {
        responseArea.innerHTML = "⚠️ Connection error. Check your signal.";
    }
}

// Connect the main Send button
document.getElementById('sendBtn').onclick = askAI;
