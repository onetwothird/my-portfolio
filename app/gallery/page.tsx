import { Metadata } from "next";
import MoreGallery from "../_components/pages/MoreGallery";
import Cursor from "../_components/site/Cursor";

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