import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function Certification() {
  const certifications = [
    {
      title: "Mastering SQL Query Optimization",
      issuer: "Gordon College - SREGEN",
      date: "2025",
      imageUrl: "/cert/e-cert_1.png",
      pdfUrl: "/cert/e-cert_1.pdf"
    },
    {
      title: "Artificial Intelligence & Innovation",
      issuer: "KOENIG",
      date: "2025",
      imageUrl: "/cert/e-cert_2.png",
      pdfUrl: "/cert/e-cert_2.pdf"
    },
    {
      title: "Generative AI: ChatGPT to AutoGPT",
      issuer: "NIELIT-Delhi",
      date: "2024",
      imageUrl: "/cert/e-cert_3.png",
      pdfUrl: "/cert/e-cert_3.pdf"
    },
    {
      title: "Future of Containerization",
      issuer: "Cognixia",
      date: "2024",
      imageUrl: "/cert/e-cert_4.png",
      pdfUrl: "/cert/e-cert_4.pdf"
    },
    {
      title: "Software Engineering Principles",
      issuer: "Coursera", 
      date: "2024",
      imageUrl: "/cert/e-cert_5.png",
      pdfUrl: "/cert/e-cert_5.pdf"
    }
  ];

  const slidingCerts = [...certifications, ...certifications, ...certifications];

  return (
    <div className="min-h-screen text-black dark:text-gray-100 font-sans selection:bg-gray-500 selection:text-white transition-colors duration-300">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-[90vh]">
        
        {/* Navigation Header */}
        <div className="mb-16 animate-slide-up">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Certifications</h1>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            A collection of professional certifications and completed coursework validating my technical expertise.
          </p>
        </div>

        {/* Sliding Animation Section */}
        <div 
          className="relative overflow-hidden w-full py-8 mt-auto mb-auto before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-linear-to-r before:from-white before:to-transparent dark:before:from-[#0a0a0a] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-linear-to-l after:from-white after:to-transparent dark:after:from-[#0a0a0a] animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="animate-marquee gap-8 pr-8">
            {slidingCerts.map((cert, index) => (
              <a 
                key={index} 
                href={cert.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 w-85 md:w-100 flex flex-col bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all hover:shadow-[0_4px_20px_rgba(156,163,175,0.25)] dark:hover:shadow-[0_4px_20px_rgba(156,163,175,0.1)] group"
              >
                {/* Image Preview Area */}
                <div className="relative w-full aspect-[1.414] bg-white dark:bg-white border-b border-gray-200 dark:border-zinc-800 overflow-hidden">
                  <Image 
                    src={cert.imageUrl}
                    alt={`${cert.title} Certificate`}
                    fill
                    sizes="(max-width: 768px) 340px, 400px"
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all flex items-center justify-center z-20">
                    <span className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white px-4 py-2 rounded-sm text-sm font-bold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all">
                      View PDF <ExternalLink size={16} />
                    </span>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-5 flex flex-col flex-1 justify-between bg-white/50 dark:bg-transparent backdrop-blur-sm z-10 relative">
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white mb-1 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors leading-snug truncate">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-block px-2 py-1 bg-gray-50 dark:bg-black border border-gray-100 dark:border-zinc-800 rounded-sm text-xs font-mono text-gray-500">
                      Issued: {cert.date}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}