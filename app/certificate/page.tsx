import { Metadata } from "next";
import Certification from "../_components/pages/Certification";
import Cursor from "../_components/site/Cursor";

export const metadata: Metadata = {
  title: "Certificates | Angelito P. Decatoria III",
  description: "A collection of certificates, training credentials, and achievements.",
};

export default function CertificatePage() {
  return (
      <>
        <Certification />
        <Cursor />
      </>
    );
}