// This connects to the Secret Key you saved in GitHub
const API_KEY = process.env.AI_API_KEY; 

// --- 1. THE TEACHER'S LESSON PLAN GENERATOR ---
function generateLessonPlan(subject, grade, topic) {
  const prompt = `Act as a Zambian Senior Teacher. Create a Scheme of Work grid for ${subject}, ${grade}, Topic: ${topic}. 
  Include columns for: Week, Topic, Competencies (CBC style), Teaching Method, and Assessment. 
  Ensure it aligns with the Ministry of Education standards.`;
  
  return callAI(prompt);
}

// --- 2. THE STUDENT'S SYLLABUS TUTOR ---
function startTutorSession(userGrade, studentQuestion) {
  let syllabusType = userGrade.includes("Form") ? "New CBC Curriculum" : "Old Senior Syllabus";
  
  const prompt = `You are a Tutor for a ${userGrade} student in Zambia using the ${syllabusType}. 
  Answer this question simply: ${studentQuestion}. 
  If it's Grade 12, focus on Exam Prep. If it's CBC, focus on practical skills.`;

  return callAI(prompt);
}

// --- 3. THE SUBSCRIPTION CHECKER ---
function checkAccess(userTier) {
  if (userTier === "Basic") {
    return "Limit: 5 AI questions per day. Grade 10-12 only.";
  } else if (userTier === "Standard") {
    return "Limit: 50 AI questions. Full CBC Access + Parent Reports.";
  } else {
    return "Unlimited Access + Teacher Lesson Plan Exporting.";
  }
}

// (Technical function that sends the prompt to the AI)
async function callAI(text) {
  // This part connects your button to the AI key
  console.log("Connecting to AI with your secure key...");
  // ... connection logic goes here ...
}
