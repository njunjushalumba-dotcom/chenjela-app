// --- KEY & TIER MANAGER ---
let API_KEY = localStorage.getItem('chenjela_key');
let userTier = localStorage.getItem('user_tier') || 'basic';

if (window.location.search.includes('reset=true')) {
    localStorage.removeItem('chenjela_key');
    localStorage.removeItem('user_tier');
    API_KEY = null;
}

if (!API_KEY) {
    API_KEY = prompt("Enter your Google API Key to activate:");
    if (API_KEY) localStorage.setItem('chenjela_key', API_KEY.trim());
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
    
    responseArea.innerHTML = "Teacher Chenjela is thinking... 🇿🇲";

    try {
        // FIXED URL BELOW
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `Role: Expert Zambian Teacher. Context: Use Zambian CBC (Form 1-4) and Grade 10-12 syllabus. Use local examples (Kwacha, Zambian towns). User: ${userInput}` 
                    }] 
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            responseArea.innerHTML = "⚠️ API Error: " + data.error.message;
        } else {
            const aiText = data.candidates[0].content.parts[0].text;
            responseArea.innerHTML = aiText.replace(/\n/g, '<br>');
            inputField.value = ""; 
        }

    } catch (error) {
        responseArea.innerHTML = "⚠️ Connection failed. Check your data.";
    }
}

document.getElementById('sendBtn').onclick = askAI;
