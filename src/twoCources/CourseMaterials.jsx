import React, { useState } from 'react';
import './CourseMaterials.css';

import {
  ChevronDown,
  ChevronRight,
  FileText,
  Presentation,
  ExternalLink,
  Home,
  BookOpen,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import './CourseMaterials.css'; // ✅ Подключаем CSS

const CourseMaterialsModule = () => {
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [courseData, setCourseData] = useState({
    courseId: 'course-101',
    courseTitle: 'Веб-разработка: от основ до продакшена',
    topics: [
      {
        id: 'topic-1',
        title: 'Введение в HTML и CSS',
        done: false,
        items: [
          { type: 'pdf', title: 'Основы HTML5 — структура документа' },
          { type: 'slide', title: 'CSS: селекторы и каскадирование' },
          { type: 'link', title: 'MDN Web Docs: HTML Reference', url: '#' },
          { type: 'pdf', title: 'Практика: создание первой страницы' },
        ],
      },
      {
        id: 'topic-2',
        title: 'JavaScript: основы программирования',
        done: false,
        items: [
          { type: 'pdf', title: 'Переменные, типы данных и операторы' },
          { type: 'slide', title: 'Функции и области видимости' },
          { type: 'pdf', title: 'Массивы и объекты в JavaScript' },
          { type: 'link', title: 'JavaScript.info — учебник', url: '#' },
        ],
      },
      {
        id: 'topic-3',
        title: 'React: современный фронтенд',
        done: false,
        items: [
          { type: 'slide', title: 'Компоненты и пропсы' },
          { type: 'pdf', title: 'Hooks: useState и useEffect' },
          { type: 'link', title: 'Официальная документация React', url: '#' },
        ],
      },
      {
        id: 'topic-4',
        title: 'Backend и базы данных',
        done: false,
        items: [
          { type: 'pdf', title: 'Node.js и Express.js' },
          { type: 'slide', title: 'REST API: принципы и практика' },
          { type: 'pdf', title: 'SQL и работа с PostgreSQL' },
          { type: 'link', title: 'PostgreSQL Tutorial', url: '#' },
        ],
      },
    ],
  });

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      next.has(topicId) ? next.delete(topicId) : next.add(topicId);
      return next;
    });
  };

  const toggleTopicDone = (topicId) => {
    setCourseData((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId ? { ...topic, done: !topic.done } : topic
      ),
    }));
  };

  const calculateProgress = () => {
    const total = courseData.topics.length;
    const completed = courseData.topics.filter((t) => t.done).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'slide':
        return <Presentation className="w-4 h-4 text-blue-500" />;
      case 'link':
        return <ExternalLink className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const progress = calculateProgress();
  const completedCount = courseData.topics.filter((t) => t.done).length;
  const totalCount = courseData.topics.length;

  return (
    <div className="course-wrapper">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Home className="icon" />
        <span>Каталог</span>
        <ChevronRight className="icon" />
        <span className="current">{courseData.courseTitle}</span>
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
              cx="50"
              cy="50"
              r="45"
              className="progress-ring__circle"
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
        {courseData.topics.map((topic, index) => (
          <div key={topic.id} className="topic-card">
            <div className="topic-header">
              <button
                onClick={() => toggleTopicDone(topic.id)}
                className="done-btn"
              >
                {topic.done ? (
                  <CheckCircle2 className="done" />
                ) : (
                  <Circle className="not-done" />
                )}
              </button>
              <button onClick={() => toggleTopic(topic.id)} className="topic-btn">
                <span className="topic-number">{index + 1}</span>
                <span className={`topic-title ${topic.done ? 'done-title' : ''}`}>
                  {topic.title}
                </span>
                {expandedTopics.has(topic.id) ? (
                  <ChevronDown className="arrow" />
                ) : (
                  <ChevronRight className="arrow" />
                )}
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
      </div>
    </div>
  );
};

export default CourseMaterialsModule;
