export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const services: ServiceItem[] = [
  {
    id: "s1",
    title: "הקמת עמותה",
    description: "ליווי מלא בתהליך הרישום מול רשם העמותות",
    icon: "🏗️",
    color: "#1a3a8f",
  },
  {
    id: "s2",
    title: "ניהול תקין",
    description: "שמירה על תשתית ניהולית תקינה ועמידה בדרישות",
    icon: "🏛️",
    color: "#1e3a5f",
  },
  {
    id: "s3",
    title: "דוחות שנתיים",
    description: "הכנה והגשת דוחות כספיים ומילוליים במועד",
    icon: "📊",
    color: "#5a3d5a",
  },
  {
    id: "s4",
    title: "סעיף 46",
    description: "ליווי בקבלת אישור זיכוי מס לתורמים",
    icon: "🧾",
    color: "#3b5a3b",
  },
  {
    id: "s5",
    title: "פרוטוקולים",
    description: "ניסוח וניהול פרוטוקולים מקצועיים",
    icon: "📋",
    color: "#2d5a3d",
  },
  {
    id: "s6",
    title: "ייעוץ משפטי",
    description: "ייעוץ בנושאי ניגוד עניינים ותגמול חברי ועד",
    icon: "⚖️",
    color: "#6b4c3b",
  },
];
