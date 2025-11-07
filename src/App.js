import React, { useState } from "react";
import Nav from "./navSys/Nav";
import CoursePage from "./pagesSys-moduleOne/CoursePage";
import "./App.css";

const PAGES = {
  courses: { title: "Курсы", element: <CoursePage /> },
};

export default function App() {
  const [page, setPage] = useState("courses");
  const navItems = Object.entries(PAGES).map(([key, v]) => ({ key, title: v.title }));
  return (
    <div className="appShell">
      <Nav items={navItems} activeKey={page} onChange={setPage} brand="LMSfe" />
      <main className="page">{PAGES[page].element}</main>
    </div>
  );
}
