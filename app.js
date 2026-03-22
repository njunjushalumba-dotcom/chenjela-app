<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chenjela AI 🇿🇲</title>
    <style>
        body { background-color: #003366; color: white; font-family: sans-serif; margin: 0; padding-bottom: 60px; }
        .nav-bar { background: #002244; padding: 10px; display: flex; justify-content: space-around; position: sticky; top: 0; z-index: 100; border-bottom: 2px solid #FFD700; }
        .nav-item { color: #FFD700; text-decoration: none; font-size: 14px; font-weight: bold; cursor: pointer; }
        .page { display: none; padding: 20px; text-align: center; }
        .active-page { display: block; }
        #chat-container { background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; min-height: 250px; margin: 20px auto; width: 90%; overflow-y: auto; text-align: left; border: 1px solid #555; }
        input { width: 80%; padding: 12px; border-radius: 5px; border: none; font-size: 16px; margin-bottom: 10px; }
        button { background: #FFD700; color: #003366; padding: 12px 25px; border: none; border-radius: 5px; font-weight: bold; width: 85%; cursor: pointer; margin-top: 10px; }
        .price-card { background: white; color: #333; margin: 15px auto; padding: 15px; border-radius: 10px; border-left: 5px solid #FFD700; width: 90%; text-align: left; }
        .premium-btn { background: #003366; color: white; margin-top: 5px; }
    </style>
</head>
<body>

    <div class="nav-bar">
        <span class="nav-item" onclick="showPage('home')">AI ASSIST</span>
        <span class="nav-item" onclick="showPage('syllabus')">SYLLABUS</span>
        <span class="nav-item" onclick="showPage('pricing')">UPGRADE</span>
    </div>

    <div id="home" class="page active-page">
        <h1 style="color: #FFD700;">Teacher Chenjela</h1>
        <p>Zambian CBC Expert (Form 1-4 & Gr 10-12)</p>
        <div id="chat-container">
            <div id="responseArea">Welcome, Teacher. Ask me to draft a lesson plan or explain a CBC topic...</div>
        </div>
        <input type="text" id="userInput" placeholder="Type your question here...">
        <button id="sendBtn">Send Question</button>
    </div>

    <div id="syllabus" class="page">
        <h2 style="color: #FFD700;">Zambian Curriculum</h2>
        <div style="text-align: left; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
            <p>📚 <b>Senior Secondary:</b> Grade 10-12 (Old Syllabus).</p>
            <p>📚 <b>Junior Secondary:</b> Form 1-4 (New CBC Curriculum).</p>
            <p><i>Note: Premium members get access to downloadable schemes of work.</i></p>
        </div>
        <button onclick="showPage('pricing')">Upgrade for Full Access</button>
    </div>

    <div id="pricing" class="page">
        <h2 style="color: #FFD700;">Membership Tiers</h2>
        
        <div class="price-card">
            <h3>Standard (K150/mo)</h3>
            <p>Unlimited AI + Lesson Plans.</p>
            <button onclick="alert('AIRTEL: +260974192798 \nMTN: +260968822006 \nName: Precious Shalumba')">View Payment Info</button>
            <button class="premium-btn" onclick="window.open('https://wa.me/260974192798?text=I%20have%20paid%20K150%20for%20Chenjela%20Standard')">Send Proof (WhatsApp)</button>
            <button class="premium-btn" onclick="checkCode()" style="background: #28a745;">Activate with Code</button>
        </div>

        <div class="price-card">
            <h3>Premium (K300/mo)</h3>
            <p>Teacher + Parent Portal Access.</p>
            <button onclick="window.open('https://wa.me/260974192798?text=Interested%20in%20Premium%20Plan')">Contact for Premium</button>
        </div>
    </div>

    <script src="app.js?v=4"></script>
</body>
</html>
