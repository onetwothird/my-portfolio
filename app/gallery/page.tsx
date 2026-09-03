import { Metadata } from "next";
import MoreGallery from "../components/MoreGallery";
import Cursor from "../components/Cursor";

export const metadata: Metadata = {
  title: "Gallery | Angelito P. Decatoria III",
  description: "A visual collection of moments, memories, and experiences.",
};

export default function GalleryPage() {
  return (
    <>
      <MoreGallery />
      <Cursor />
    </>
  );
}