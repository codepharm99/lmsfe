import React, { useMemo, useState } from "react";
import "./courses.css"; 

const initialCourses = [
  { id: 1, title: "Algorithms", code: "CS101", teacher: "D. Knuth",  org: "IUA", color: "#2b7cff", enrolled: false },
  { id: 2, title: "Linear Algebra", code: "MATH201", teacher: "G. Strang", org: "IUA", color: "#ffb800", enrolled: true },
  { id: 3, title: "Web Development", code: "CS204", teacher: "S. Lee", org: "IUA", color: "#22c55e", enrolled: false },
  { id: 4, title: "Databases", code: "CS230", teacher: "A. Stone", org: "IUA", color: "#a855f7", enrolled: false },
  { id: 5, title: "Operating Systems", code: "CS240", teacher: "A. Tanen", org: "IUA", color: "#ef4444", enrolled: true },
  { id: 6, title: "Discrete Math", code: "MATH150", teacher: "N. Lutz", org: "IUA", color: "#06b6d4", enrolled: false },
];

export default function CoursePage() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState(initialCourses);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(c =>
      [c.title, c.code, c.teacher].some(v => v.toLowerCase().includes(q))
    );
  }, [query, courses]);

  const enrolledCount = useMemo(
    () => courses.reduce((acc, c) => acc + (c.enrolled ? 1 : 0), 0),
    [courses]
  );

  const toggleEnroll = (id) =>
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, enrolled: !c.enrolled } : c)));

  return (
    <div className="catalog">
      <header className="catalog__bar">
        <h1>Курсы</h1>
        <div className="catalog__controls">
          <input
            className="catalog__search"
            placeholder="Поиск: название, код или препод…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="badge">Зачислено: {enrolledCount}</span>
        </div>
      </header>

      <section className="grid">
        {filtered.length === 0 && <div className="empty">Ничего не найдено.</div>}

        {filtered.map(course => (
          <article className="card" key={course.id}>
            <div className="card__color" style={{ backgroundColor: course.color }} />
            <div className="card__content">
              <div className="card__top">
                <h2 className="card__title">{course.title}</h2>
                <span className="tag">{course.org}</span>
              </div>
              <div className="card__meta">
                <span className="code">{course.code}</span>
                <span className="dot">•</span>
                <span className="teacher">{course.teacher}</span>
              </div>
              <button
                className={`enroll ${course.enrolled ? "enrolled" : ""}`}
                onClick={() => toggleEnroll(course.id)}
                aria-pressed={course.enrolled}
              >
                {course.enrolled ? "Отписаться" : "Зачислиться"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
