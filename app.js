// --- KEY & TIER MANAGER ---
let API_KEY = localStorage.getItem('chenjela_key');
let userTier = localStorage.getItem('user_tier') || 'basic';

if (window.location.search.includes('reset=true')) {
    localStorage.removeItem('chenjela_key');
    localStorage.removeItem('user_tier');
    API_KEY = null;
}

if (!API_KEY) {
    API_KEY = prompt("Enter your Google API Key to activate Chenjela:");
    if (API_KEY) {
        localStorage.setItem('chenjela_key', API_KEY.trim());
    }
}

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
}

// --- ACTIVATION CODE SYSTEM ---
function checkCode() {
    const code = prompt("Enter your 6-digit Activation Code:");
    if (code === "CJ2026") { 
        localStorage.setItem('user_tier', 'premium');
        alert("Success! Premium Membership Activated.");
        location.reload();
    } else {
        alert("Invalid code. Please pay K150 to Precious Shalumba.");
    }
}

// --- AI ENGINE ---
async function askAI() {
    const inputField = document.getElementById('userInput');
    const responseArea = document.getElementById('responseArea');
    const userInput = inputField.value;

    if (!userInput) return;
    if (!API_KEY) {
        alert("Please refresh and enter your key.");
        return;
    }

    responseArea.innerHTML = "Consulting Teacher Chenjela... 🇿🇲";

    try {
        // THE NEW STABLE URL (Changed v1beta to v1 and used gemini-1.5-flash)
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `You are Teacher Chenjela, a Zambian CBC expert. Answer this question for a Zambian student or teacher: ${userInput}` 
                    }] 
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            // If it still fails, it will show the specific reason here
            responseArea.innerHTML = "⚠️ API Error: " + data.error.message + " (Code: " + data.error.code + ")";
        } else if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            responseArea.innerHTML = aiText.replace(/\n/g, '<br>');
            inputField.value = ""; 
        } else {
            responseArea.innerHTML = "⚠️ Unexpected response format. Please try again.";
        }

    } catch (error) {
        responseArea.innerHTML = "⚠️ Connection failed. Please check your data.";
    }
}

document.getElementById('sendBtn').onclick = askAI;
