import React, { useState } from "react";
import CoursePage from "./pagesSys-moduleOne/CoursePage"; // модуль №1
import courses from "/Users/taurbek/lmsfe/src/pagesSys-moduleOne/courses.css"; // модуль №1

// Реестр страниц: добавляй сюда новые модули
const PAGES = {
  courses: { title: "Курсы", element: <CoursePage /> },
  // пример на будущее:
  // students: { title: "Студенты", element: <StudentsPage /> },
  // profile:  { title: "Профиль",  element: <ProfilePage /> },
};

export default function App() {
  const [page, setPage] = useState("courses");

  return (
    <div className="appShell">
      <nav className="topbar">
        <div className="brand">LMSfe</div>
        <ul className="nav">
          {Object.entries(PAGES).map(([key, { title }]) => (
            <li key={key}>
              <button
                className={`nav-btn ${key === page ? "active" : ""}`}
                onClick={() => setPage(key)}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="page">{PAGES[page].element}</main>
    </div>
  );
}
