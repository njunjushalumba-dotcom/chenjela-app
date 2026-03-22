// 1. POWERING CHENJELA AI 🇿🇲
const API_KEY = "AIzaSyB-fOdB2NuPcqKhJ2gvYzCPflR5jYVcC7Y";
const FREE_LIMIT = 5;

// 2. THE BRAIN FUNCTION
async function askAI() {
    const userInput = document.getElementById('userInput').value;
    const responseArea = document.getElementById('responseArea');

    if (!userInput) return alert("Please ask a question!");

    // CHECK USAGE LIMIT
    let usage = localStorage.getItem('chenjela_usage') || 0;
    if (parseInt(usage) >= FREE_LIMIT) {
        responseArea.innerHTML = `
            <div style="border: 2px solid #f5b400; padding: 15px; border-radius: 10px; background: rgba(245, 180, 0, 0.1);">
                <h4 style="color: #f5b400; margin: 0;">Daily Limit Reached! 🇿🇲</h4>
                <p style="font-size: 14px;">You've used your 5 free questions. To ask more and access Teacher Grids, upgrade to Premium.</p>
                <a href="https://wa.me/260971234567?text=Hi!%20I%20want%20to%20activate%20Chenjela%20Premium" 
                   style="background: #25D366; color: white; padding: 10px; display: block; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
                   Upgrade to Premium (K150)
                </a>
            </div>`;
        return;
    }

    responseArea.innerHTML = "Consulting Zambian Syllabus... 🇿🇲";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are Teacher Chenjela, an expert Zambian educator. 
                        Context: Use Zambian Kwacha (K). Reference CBC curriculum (Form 1-4) 
                        and ECZ syllabus (Grade 10-12). Explain things using Zambian 
                        examples (like Nshima, local markets, or Zambian history). 
                        Question: ${userInput}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            responseArea.innerHTML = "Teacher Chenjela is resting. (API Key Error).";
            return;
        }

        const aiText = data.candidates[0].content.parts[0].text;
        
        // SAVE USAGE
        localStorage.setItem('chenjela_usage', parseInt(usage) + 1);
        
        // DISPLAY ANSWER
        responseArea.innerHTML = `
            <div style="color: #f5b400; font-weight: bold; margin-bottom: 5px;">Teacher Chenjela:</div>
            <div style="font-size: 15px; line-height: 1.5;">${aiText.replace(/\n/g, '<br>')}</div>
            <small style="display:block; margin-top:10px; color: #888;">Free questions used: ${parseInt(usage) + 1}/${FREE_LIMIT}</small>`;
        
    } catch (error) {
        responseArea.innerHTML = "Connection error. Please check your internet, bwana!";
    }
}

// 3. THE TEACHER GRID FUNCTION
function generateGrid() {
    const topic = document.getElementById('topicInput').value;
    const responseArea = document.getElementById('responseArea');
    
    if (!topic) return alert("Enter a topic!");

    responseArea.innerHTML = `
        <div style="background: white; color: black; padding: 15px; border-radius: 10px; margin-top: 15px;">
            <h4 style="margin:0; color: #0a0f1e;">CBC Scheme: ${topic}</h4>
            <table border="1" style="width:100%; border-collapse: collapse; margin-top:10px; font-size: 12px; border-color: #ccc;">
                <tr style="background: #f5b400; color: #0a0f1e;"><th>Week</th><th>Outcome</th></tr>
                <tr><td>1-2</td><td>Describe ${topic} in Zambia.</td></tr>
                <tr><td>3-4</td><td>Practical application.</td></tr>
            </table>
            <p style="font-size: 11px; margin-top: 10px; color: #666;">*Full 12-week grid requires Premium (K150)*</p>
        </div>`;
}
