import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedCourses, seedMaterials } from "./data";

const LS_KEY = "lmsfe-db-v1";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // загрузка из localStorage
  const [courses, setCourses] = useState(() => {
    const saved = safeLoad();
    return saved?.courses ?? seedCourses;
  });
  const [materialsByCourse, setMaterialsByCourse] = useState(() => {
    const saved = safeLoad();
    return saved?.materialsByCourse ?? seedMaterials;
  });

  // сохранение
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ courses, materialsByCourse }));
  }, [courses, materialsByCourse]);

  // --- actions ---
  const toggleEnroll = (courseId) =>
    setCourses(prev => prev.map(c => (c.id === courseId ? { ...c, enrolled: !c.enrolled } : c)));

  const toggleTopicDone = (courseId, topicId) =>
    setMaterialsByCourse(prev => {
      const course = prev[courseId];
      if (!course) return prev;
      const topics = course.topics.map(t => (t.id === topicId ? { ...t, done: !t.done } : t));
      return { ...prev, [courseId]: { ...course, topics } };
    });

  // --- selectors ---
  const getCourse = (courseId) => courses.find(c => c.id === courseId) || null;
  const getMaterials = (courseId) => materialsByCourse[courseId] || { courseId, courseTitle: "", topics: [] };
  const enrolledCount = useMemo(() => courses.filter(c => c.enrolled).length, [courses]);

  const value = {
    // state
    courses,
    materialsByCourse,
    // selectors
    getCourse,
    getMaterials,
    enrolledCount,
    // actions
    toggleEnroll,
    toggleTopicDone,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

function safeLoad() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
