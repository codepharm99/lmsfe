import React, { useState } from "react";
import { DataProvider } from "./dataSys/DataContext";
import Nav from "./navSys/Nav";
import CoursePage from "./pagesSys-moduleOne/CoursePage";
import CourseMaterialsModule from "./pagesSys-moduleTwo/CourseMaterials";
import "./App.css";

const PAGES = {
  courses:   { title: "Курсы",      element: <CoursePage /> },
  materials: { title: "Материалы",  element: <CourseMaterialsModule courseId="cs204" /> }, // пример
};

export default function App() {
  const [page, setPage] = useState("courses");
  const navItems = Object.entries(PAGES).map(([key, v]) => ({ key, title: v.title }));
  return (
    <DataProvider>
      <div className="appShell">
        <Nav items={navItems} activeKey={page} onChange={setPage} brand="LMSfe" />
        <main className="page">{PAGES[page].element}</main>
      </div>
    </DataProvider>
  );
}
