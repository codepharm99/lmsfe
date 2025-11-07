import React, { useState, useEffect } from 'react';
import { BarChart2, CheckCircle2, Clock, XCircle } from 'lucide-react';

const GradebookModule = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'HTML Basics', max: 100, score: 85, status: 'Сдано', due: '2025-10-01' },
    { id: 2, title: 'CSS Layouts', max: 100, score: 70, status: 'Сдано', due: '2025-10-05' },
    { id: 3, title: 'JavaScript DOM', max: 100, score: 0, status: 'Просрочено', due: '2025-09-28' },
    { id: 4, title: 'React Components', max: 100, score: 90, status: 'Сдано', due: '2025-10-10' },
  ]);

  const total = assignments.length;
  const completed = assignments.filter(a => a.status === 'Сдано').length;
  const overdue = assignments.filter(a => a.status === 'Просрочено').length;
  const avgScore = Math.round(assignments.reduce((sum, a) => sum + a.score, 0) / total);

  const progress = Math.round((completed / total) * 100);

  return (
    <div className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-indigo-600">
        <BarChart2 className="w-6 h-6" /> Оценки по курсу
      </h1>

      {/* Сводные карточки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-indigo-600">{avgScore}%</div>
          <div className="text-slate-600">Средний балл</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-green-600">{completed}/{total}</div>
          <div className="text-slate-600">Выполнено заданий</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-red-600">{overdue}</div>
          <div className="text-slate-600">Просрочено</div>
        </div>
      </div>

      {/* Кольцевой прогресс */}
      <div className="flex justify-center mb-6">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 transform -rotate-90">
            <circle cx="56" cy="56" r="48" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="#6366f1"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 48}`}
              strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-slate-800">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Таблица заданий */}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100 text-left text-slate-700">
            <th className="p-3 rounded-tl-lg">Задание</th>
            <th className="p-3">Макс</th>
            <th className="p-3">Балл</th>
            <th className="p-3">Статус</th>
            <th className="p-3 rounded-tr-lg">Дедлайн</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id} className={`border-t ${a.status === 'Просрочено' ? 'bg-red-50' : 'bg-white'}`}>
              <td className="p-3">{a.title}</td>
              <td className="p-3 text-center">{a.max}</td>
              <td className="p-3 text-center">{a.score}</td>
              <td className="p-3 flex items-center gap-2">
                {a.status === 'Сдано' && <CheckCircle2 className="text-green-500 w-4 h-4" />}
                {a.status === 'Просрочено' && <XCircle className="text-red-500 w-4 h-4" />}
                {a.status === 'В процессе' && <Clock className="text-yellow-500 w-4 h-4" />}
                {a.status}
              </td>
              <td className="p-3 text-slate-600">{a.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradebookModule;
