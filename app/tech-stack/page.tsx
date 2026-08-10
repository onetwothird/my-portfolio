import { Metadata } from "next";
import TechStack from "../components/TechStack";

export const metadata: Metadata = {
  title: "Tech Stack | Angelito P. Decatoria III",
  description: "A showcase of technologies and tools I use in my development work.",
};
  
export default function TechStackPage() {
  return <TechStack />;
}