import { Metadata } from "next";
import Projects from "../components/Projects";

export const metadata: Metadata = {
  title: "Projects | Angelito P. Decatoria III",
  description: "Recent full-stack and mobile development projects.",
};

export default function ProjectsPage() {
  return <Projects />;
}