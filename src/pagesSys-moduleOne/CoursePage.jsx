import React, { useMemo, useState } from "react";
import { useData } from "../dataSys/DataContext"; // путь скорректируй относительно файла
import "./courses.css";

export default function CoursePage() {
  const { courses, toggleEnroll, enrolledCount } = useData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(c =>
      [c.title, c.code, c.teacher].some(v => v.toLowerCase().includes(q))
    );
  }, [query, courses]);

  return (
    <div className="catalog">
      <header className="catalog__bar">
        <h1>Курсы</h1>
        <div className="catalog__controls">
          <input className="catalog__search" placeholder="Поиск: название, код или препод…"
                 value={query} onChange={e => setQuery(e.target.value)} />
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
              <button className={`enroll ${course.enrolled ? "enrolled" : ""}`}
                      onClick={() => toggleEnroll(course.id)}>
                {course.enrolled ? "Отписаться" : "Зачислиться"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
