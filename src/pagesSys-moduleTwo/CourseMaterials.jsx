import React, { useMemo, useState } from "react";
import { useData } from "../dataSys/DataContext";
import {
  ChevronDown, ChevronRight, FileText, Presentation, ExternalLink,
  Home, BookOpen, CheckCircle2, Circle,
} from "lucide-react";
import "./CourseMaterials.css";

export default function CourseMaterialsModule({ courseId = "cs204" }) {
  const { getCourse, getMaterials, toggleTopicDone } = useData();
  const course = getCourse(courseId);
  const materials = getMaterials(courseId);
  const [expandedTopics, setExpandedTopics] = useState(new Set());

  const progress = useMemo(() => {
    const total = materials.topics.length || 0;
    const done  = materials.topics.filter(t => t.done).length;
    return total ? Math.round((done / total) * 100) : 0;
  }, [materials]);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      next.has(topicId) ? next.delete(topicId) : next.add(topicId);
      return next;
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "pdf":   return <FileText className="w-4 h-4 text-red-500" />;
      case "slide": return <Presentation className="w-4 h-4 text-blue-500" />;
      case "link":  return <ExternalLink className="w-4 h-4 text-green-500" />;
      default:      return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="course-wrapper">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Home className="icon" />
        <span>Каталог</span>
        <ChevronRight className="icon" />
        <span className="current">{materials.courseTitle || course?.title}</span>
      </div>

      {/* Header */}
      <div className="header-card">
        <div>
          <div className="title">
            <BookOpen className="icon-large" />
            <h1>Материалы курса</h1>
          </div>
          <p>Изучайте темы последовательно и отмечайте прогресс</p>
        </div>

        <div className="progress-ring">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="bg-ring" />
            <circle
              cx="50" cy="50" r="45" className="progress-ring__circle"
              style={{
                strokeDasharray: 2 * Math.PI * 45,
                strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100),
              }}
            />
          </svg>
          <div className="progress-text">{progress}%</div>
        </div>
      </div>

      {/* Topics */}
      <div className="topics-list">
        {materials.topics.map((topic, index) => (
          <div key={topic.id} className="topic-card">
            <div className="topic-header">
              <button onClick={() => toggleTopicDone(courseId, topic.id)} className="done-btn">
                {topic.done ? <CheckCircle2 className="done" /> : <Circle className="not-done" />}
              </button>
              <button onClick={() => toggleTopic(topic.id)} className="topic-btn">
                <span className="topic-number">{index + 1}</span>
                <span className={`topic-title ${topic.done ? "done-title" : ""}`}>{topic.title}</span>
                {expandedTopics.has(topic.id) ? <ChevronDown className="arrow" /> : <ChevronRight className="arrow" />}
              </button>
            </div>

            {expandedTopics.has(topic.id) && (
              <div className="topic-items">
                {topic.items.map((item, i) => (
                  <div key={i} className="topic-item">
                    {getTypeIcon(item.type)}
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {materials.topics.length === 0 && (
          <div className="topic-empty">Материалы пока не добавлены для этого курса.</div>
        )}
      </div>
    </div>
  );
}
