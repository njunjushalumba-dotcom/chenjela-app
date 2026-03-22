// --- KEY & TIER MANAGER ---
let API_KEY = localStorage.getItem('chenjela_key');
let userTier = localStorage.getItem('user_tier') || 'basic';

// Reset logic to fix any stuck errors
if (window.location.search.includes('reset=true')) {
    localStorage.removeItem('chenjela_key');
    localStorage.removeItem('user_tier');
    API_KEY = null;
}

// Ask for the API key if it's not saved
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

// --- ACTIVATION CODE SYSTEM ---
function checkCode() {
    const code = prompt("Enter your 6-digit Activation Code:");
    if (code === "CJ2026") { 
        localStorage.setItem('user_tier', 'premium');
        alert("Success! Premium Membership Activated.");
        location.reload();
    } else {
        alert("Invalid code. Please pay K150 to Precious Shalumba and send proof.");
    }
}

// --- THE AI ENGINE ---
async function askAI() {
    const inputField = document.getElementById('userInput');
    const responseArea = document.getElementById('responseArea');
    const userInput = inputField.value;

    if (!userInput) return;
    if (!API_KEY) {
        alert("Please refresh and enter your API key.");
        return;
    }

    responseArea.innerHTML = "Teacher Chenjela is preparing your answer... 🇿🇲";

    try {
        // THE UPDATED GOOGLE URL (Fixed for 2026 API requirements)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `Role: Expert Zambian Teacher. Context: Use Zambian CBC (Form 1-4) and Grade 10-12 syllabus. Provide lesson plans, explanations, and advice using local Zambian context and Kwacha. User Question: ${userInput}` 
                    }] 
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            // This captures if the key is wrong or the model is still 'not found'
            responseArea.innerHTML = "⚠️ API Error: " + data.error.message;
        } else {
            const aiText = data.candidates[0].content.parts[0].text;
            responseArea.innerHTML = aiText.replace(/\n/g, '<br>');
            inputField.value = ""; 
        }

    } catch (error) {
        responseArea.innerHTML = "⚠️ Connection failed. Please check your internet connection.";
        console.error(error);
    }
}

// Connect the main Send button
const sendBtn = document.getElementById('sendBtn');
if(sendBtn) {
    sendBtn.onclick = askAI;
}
