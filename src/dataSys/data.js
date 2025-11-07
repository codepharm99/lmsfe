// Курсы (id совпадают с materialsByCourse)
export const seedCourses = [
  { id: "cs101",  title: "Algorithms",        code: "CS101",   teacher: "D. Knuth",  org: "IUA", color: "#2b7cff", enrolled: false },
  { id: "math201",title: "Linear Algebra",    code: "MATH201", teacher: "G. Strang", org: "IUA", color: "#ffb800", enrolled: true  },
  { id: "cs204",  title: "Web Development",   code: "CS204",   teacher: "S. Lee",    org: "IUA", color: "#22c55e", enrolled: false },
  { id: "cs230",  title: "Databases",         code: "CS230",   teacher: "A. Stone",  org: "IUA", color: "#a855f7", enrolled: false },
  { id: "cs240",  title: "Operating Systems", code: "CS240",   teacher: "A. Tanen",  org: "IUA", color: "#ef4444", enrolled: true  },
  { id: "math150",title: "Discrete Math",     code: "MATH150", teacher: "N. Lutz",   org: "IUA", color: "#06b6d4", enrolled: false },
];

// Материалы по курсам (ключ = id курса)
export const seedMaterials = {
  cs204: {
    courseId: "cs204",
    courseTitle: "Веб-разработка: от основ до продакшена",
    topics: [
      {
        id: "t1",
        title: "Введение в HTML и CSS",
        done: false,
        items: [
          { type: "pdf",   title: "Основы HTML5 — структура документа" },
          { type: "slide", title: "CSS: селекторы и каскадирование" },
          { type: "link",  title: "MDN Web Docs: HTML Reference", url: "https://developer.mozilla.org/docs/Web/HTML" },
          { type: "pdf",   title: "Практика: создание первой страницы" },
        ],
      },
      {
        id: "t2",
        title: "Основы JavaScript и программирования",
        done: false,
        items: [
          { type: "pdf",   title: "Переменные, типы данных и операторы" },
          { type: "slide", title: "Функции и области видимости" },
          { type: "pdf",   title: "Массивы и объекты в JavaScript" },
          { type: "link",  title: "JavaScript.info — учебник", url: "https://javascript.info" },
        ],
      },
      {
        id: "t3",
        title: "React: современный фронтенд",
        done: false,
        items: [
          { type: "slide", title: "Компоненты и пропсы" },
          { type: "pdf",   title: "Hooks: useState и useEffect" },
          { type: "link",  title: "Официальная документация React", url: "https://react.dev/learn" },
        ],
      },
      {
        id: "t4",
        title: "Backend и базы данных",
        done: false,
        items: [
          { type: "pdf",   title: "Node.js и Express.js" },
          { type: "slide", title: "REST API: принципы и практика" },
          { type: "pdf",   title: "SQL и работа с PostgreSQL" },
          { type: "link",  title: "PostgreSQL Tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html" },
        ],
      },
    ],
  },

  // Пустые шаблоны для остальных (можешь заполнить позже)
  cs101:  { courseId: "cs101",  courseTitle: "Algorithms",        topics: [] },
  math201:{ courseId: "math201",courseTitle: "Linear Algebra",    topics: [] },
  cs230:  { courseId: "cs230",  courseTitle: "Databases",         topics: [] },
  cs240:  { courseId: "cs240",  courseTitle: "Operating Systems", topics: [] },
  math150:{ courseId: "math150",courseTitle: "Discrete Math",     topics: [] },
};
