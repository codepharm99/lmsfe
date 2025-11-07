import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const AttendanceModule = () => {
  const [weeks, setWeeks] = useState([
    { week: 1, days: [true, false, true, false, false] },
    { week: 2, days: [true, true, false, true, false] },
    { week: 3, days: [false, false, false, false, false] },
    { week: 4, days: [false, false, true, false, false] },
  ]);

  const deadlines = [
    { title: 'CSS Layout Homework', date: '2025-11-10' },
    { title: 'React Project', date: '2025-11-14' },
    { title: 'JS Quiz', date: '2025-11-20' },
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  const toggleDay = (weekIndex, dayIndex) => {
    setWeeks(prev =>
      prev.map((w, wi) =>
        wi === weekIndex
          ? { ...w, days: w.days.map((d, di) => (di === dayIndex ? !d : d)) }
          : w
      )
    );
  };

  const totalDays = weeks.reduce((sum, w) => sum + w.days.length, 0);
  const attended = weeks.reduce((sum, w) => sum + w.days.filter(Boolean).length, 0);
  const attendancePercent = Math.round((attended / totalDays) * 100);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-md max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-indigo-600">
        <Calendar className="w-6 h-6" /> Посещаемость и дедлайны
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Сетка посещаемости */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Посещаемость (4 недели)</h2>
          <div className="space-y-2">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex gap-2 items-center">
                <span className="w-16 text-slate-600 text-sm">Неделя {week.week}</span>
                {week.days.map((attended, di) => (
                  <button
                    key={di}
                    onClick={() => toggleDay(wi, di)}
                    className={`w-8 h-8 rounded-lg border transition-colors ${
                      attended
                        ? 'bg-green-500 border-green-600'
                        : 'bg-white border-slate-300 hover:bg-slate-100'
                    }`}
                    title={`День ${di + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-slate-700">
            Посещено <b>{attended}</b> из {totalDays} дней ({attendancePercent}%)
          </div>
        </div>

        {/* Список дедлайнов */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Ближайшие дедлайны</h2>
          <ul className="space-y-2">
            {deadlines.map((d, i) => (
              <li
                key={i}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-2 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-2 text-slate-800">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  {d.title}
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
                  {new Date(d.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModule;
