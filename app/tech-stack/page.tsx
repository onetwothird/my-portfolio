import { Metadata } from "next";
import TechStack from "../_components/pages/TechStack";
import Cursor from "../_components/site/Cursor";

export const metadata: Metadata = {
  title: "Tech Stack | Angelito P. Decatoria III",
  description: "A showcase of technologies and tools I use in my development work.",
};
  
export default function TechStackPage() {
  return (
      <>
        <TechStack />
        <Cursor />
      </>
    );
}