import { Metadata } from "next";
import Projects from "../_components/pages/Projects";
import Cursor from "../_components/site/Cursor";

export const metadata: Metadata = {
  title: "Projects | Angelito P. Decatoria III",
  description: "Recent full-stack and mobile development projects.",
};

export default function ProjectsPage() {
  return (
      <>
        <Projects />
        <Cursor />
      </>
    );
}