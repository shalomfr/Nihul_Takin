export interface QuestionnaireItem {
  id: string;
  question: string;
  category: string;
  icon: string;
  color: string;
}

export const questionnaire: QuestionnaireItem[] = [
  {
    id: "q1",
    question: "האם העמותה שלכם מקיימת אסיפה כללית לפחות פעם בשנה?",
    category: "אסיפה כללית",
    icon: "🏛️",
    color: "#1a3a8f",
  },
  {
    id: "q2",
    question: "האם פרוטוקולים של ישיבות ועד מנהל מתועדים כראוי?",
    category: "פרוטוקולים",
    icon: "📋",
    color: "#2d5a3d",
  },
  {
    id: "q3",
    question: "האם יש לעמותה ועדת ביקורת פעילה?",
    category: "ביקורת",
    icon: "🔍",
    color: "#5a4a3b",
  },
  {
    id: "q4",
    question: "האם הדוחות הכספיים מוגשים במועד לרשם העמותות?",
    category: "דוחות שנתיים",
    icon: "📊",
    color: "#5a3d5a",
  },
  {
    id: "q5",
    question: "האם חברי הוועד מקבלים גמול בהתאם לתקנות?",
    category: "תגמול",
    icon: "💰",
    color: "#4a5568",
  },
  {
    id: "q6",
    question: "האם קיימים נהלים למניעת ניגוד עניינים?",
    category: "ניגוד עניינים",
    icon: "⚖️",
    color: "#6b4c3b",
  },
  {
    id: "q7",
    question: "האם העמותה עומדת במגבלות קרובי משפחה בוועד?",
    category: "קרובי משפחה",
    icon: "👨‍👩‍👧‍👦",
    color: "#3d5a6b",
  },
  {
    id: "q8",
    question: "האם יש לעמותה אישור לפי סעיף 46?",
    category: "סעיף 46",
    icon: "🧾",
    color: "#3b5a3b",
  },
  {
    id: "q9",
    question: "האם התקנון מעודכן ותואם את פעילות העמותה?",
    category: "תקנון",
    icon: "📜",
    color: "#1e3a5f",
  },
  {
    id: "q10",
    question: "האם העמותה מנהלת פנקסי חשבונות כנדרש?",
    category: "חשבונאות",
    icon: "📒",
    color: "#5a6b3d",
  },
  {
    id: "q11",
    question: "האם יש נוהל מסודר לאישור עסקאות עם צדדים קשורים?",
    category: "ניגוד עניינים",
    icon: "🤝",
    color: "#6b4c3b",
  },
  {
    id: "q12",
    question: "האם הדוח המילולי משקף נאמנה את פעילות העמותה?",
    category: "דוחות שנתיים",
    icon: "📝",
    color: "#5a3d5a",
  },
];
