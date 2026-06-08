import { MapPin, Mail, ExternalLink, ChevronRight, Trophy, FileText } from 'lucide-react';
import { ThemeToggle } from './src/components/ThemeToggle';
import Image from "next/image";
import Link from 'next/link';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const VerifiedBadge = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 inline-block ml-2">
    <path d="M12 1.5L14 3.5L17 2.8L18 5.7L21 6.5L20.3 9.5L22.5 12L20.3 14.5L21 17.5L18 18.3L17 21.2L14 20.5L12 22.5L10 20.5L7 21.2L6 18.3L3 17.5L3.7 14.5L1.5 12L3.7 9.5L3 6.5L6 5.7L7 2.8L10 3.5L12 1.5Z" fill="currentColor" />
    <path d="M8.5 12L11 14.5L16 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen text-black dark:text-gray-100 font-sans selection:bg-[#8B5CF6] selection:text-white transition-colors duration-300">
      <div className="max-w-275 mx-auto px-6 py-12 md:py-20 space-y-16">
        
        {/* HEADER PROFILE */}
        <header className="flex flex-col md:flex-row gap-8 items-start">
          
          <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-sm overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
            <Image
              src="/img/image.png"
              alt="Angelito Decatoria"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 w-full pt-2">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-4xl font-bold tracking-tight flex items-center">
                Angelito P. Decatoria III <VerifiedBadge />
              </h1>
              <ThemeToggle />
            </div>
            
            <div className="flex items-center gap-2 text-gray-900 dark:text-gray-400 mt-2 font-medium">
              <MapPin size={16} /> Cavite, Philippines (Naic, Cavite)
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
              <p className="text-lg font-medium text-black dark:text-gray-200">
                Full Stack Developer \ CS Student 
              </p>

              <div className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 flex items-center gap-2 rounded-sm w-fit shadow-sm">
                <Trophy size={12} fill="currentColor" />
                <span>DEAN&apos;S LISTER 2022–2026</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Action Buttons */}
           <div className="flex flex-wrap gap-3 mt-6 border-b border-gray-100 dark:border-zinc-800 pb-8">

              {/* VIEW RESUME (HIGHLIGHTED) */}
              <a
                href="/resume/resume%20now.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
              >
                <FileText size={16} /> View Resume <ChevronRight size={16} className="ml-2 opacity-50" />
              </a>

              {/* GITHUB (SECONDARY) */}
              <a
                href="https://github.com/onetwothird"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-200 text-sm font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <GithubIcon size={16} /> View GitHub <ChevronRight size={16} className="ml-2 opacity-50" />
              </a>

              <a
                href="mailto:nc.angelitoiii.decatoria@cvsu.edu.ph"
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-200 text-sm font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <Mail size={16} /> Send Email
              </a>

            </div>
          </div>
        </header>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
          
          {/* LEFT COLUMN (Content Stream) */}
          <div className="space-y-16">
            
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <div className="space-y-4 text-black dark:text-gray-300 leading-relaxed">
                <p>
                  I&apos;m a full-stack developer and senior Computer Science student specializing in building structural, high-fidelity web ecosystems alongside intelligent mobile applications. I work on projects including modern web platforms, POS systems, and integrating AI into daily utilities.
                </p>
                <p>
                  I&apos;ve engineered solutions locally, from educational simulators mapping CPU algorithms to corporate document tracking systems deployed during my OJT. My technical landscape balances rigorous software development with practical execution.
                </p>
                <p>
                  Lately, I&apos;ve been diving deeper into the world of artificial intelligence and computer vision, focusing on integrating YOLO and TensorFlow Lite tools natively into mobile ecosystems. My flagship work, Seelai, leverages this to empower individuals with visual impairments.
                </p>
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
                <h2 className="text-2xl font-bold">Tech Stack</h2>
                <Link href="/tech-stack" className="text-sm font-semibold text-black dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white flex items-center transition-colors group">
                  View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-gray-100 mb-3">Frontend & Mobile</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'Dart', 'React.js', 'Next.js', 'HTML5', 'CSS3', 'Flutter SDK'].map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-300 text-sm font-medium rounded-sm">{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-gray-100 mb-3">Backend & Database</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'PHP', 'MySQL', 'Firebase', 'REST APIs'].map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-300 text-sm font-medium rounded-sm">{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-gray-100 mb-3">AI & Developer Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {['TensorFlow Lite', 'YOLO', 'Roboflow', 'Label Studio', 'Git', 'VS Code'].map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-300 text-sm font-medium rounded-sm">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Projects */}
            <section>
              <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
                <h2 className="text-2xl font-bold">Recent Projects</h2>

                <Link
                  href="/projects"
                  className="text-sm font-semibold text-black dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white flex items-center transition-colors group"
                >
                  View All
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Project 1 */}
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 rounded-sm group hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer">
                  <h3 className="font-bold text-black dark:text-white mb-1">
                    Seelai AI Assistant
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-400 mb-4 h-10 line-clamp-2">
                    Real-time object & caretaker face detection mobile app.
                  </p>
                  <div className="flex gap-2 text-xs font-mono bg-white dark:bg-black w-fit px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                    seelai-app.dev
                  </div>
                </div>

                {/* Project 2 */}
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 rounded-sm group hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer">
                  <h3 className="font-bold text-black dark:text-white mb-1">
                    ODCI Document Tracker
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-400 mb-4 h-10 line-clamp-2">
                    Centralized role-based corporate routing system.
                  </p>
                  <div className="flex gap-2 text-xs font-mono bg-white dark:bg-black w-fit px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                    odci.internal
                  </div>
                </div>

                {/* Project 3 */}
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 rounded-sm group hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer">
                  <h3 className="font-bold text-black dark:text-white mb-1">
                    AlgoVerse Simulator
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-400 mb-4 h-10 line-clamp-2">
                    Visual CPU scheduling execution platform.
                  </p>
                  <div className="flex gap-2 text-xs font-mono bg-white dark:bg-black w-fit px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                    algo-verse.edu
                  </div>
                </div>

                {/* Project 4 */}
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 rounded-sm group hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer">
                  <h3 className="font-bold text-black dark:text-white mb-1">
                    Jayann&apos;s Store POS
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-400 mb-4 h-10 line-clamp-2">
                    Full stack inventory & ecommerce application.
                  </p>
                  <div className="flex gap-2 text-xs font-mono bg-white dark:bg-black w-fit px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                    store-pos.local
                  </div>
                </div>

              </div>
            </section>        

            {/* Certifications Grid */}
            <section>
              <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
                <h2 className="text-2xl font-bold">Recent Certifications</h2>
                <Link href="/certifications" className="text-sm font-semibold text-black dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white flex items-center transition-colors group">
                  View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-zinc-900 p-4 border border-gray-200 dark:border-zinc-800 rounded-sm">
                  <h4 className="font-bold text-sm text-black dark:text-white">Mastering SQL Query Optimization</h4>
                  <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">Gordon College - SREGEN</p>
                </div>
                <div className="bg-gray-50 dark:bg-zinc-900 p-4 border border-gray-200 dark:border-zinc-800 rounded-sm">
                  <h4 className="font-bold text-sm text-black dark:text-white">Artificial Intelligence & Innovation</h4>
                  <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">KOENIG</p>
                </div>
                <div className="bg-gray-50 dark:bg-zinc-900 p-4 border border-gray-200 dark:border-zinc-800 rounded-sm">
                  <h4 className="font-bold text-sm text-black dark:text-white">Generative AI: ChatGPT to AutoGPT</h4>
                  <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">NIELIT-Delhi</p>
                </div>
                <div className="bg-gray-50 dark:bg-zinc-900 p-4 border border-gray-200 dark:border-zinc-800 rounded-sm">
                  <h4 className="font-bold text-sm text-black dark:text-white">Future of Containerization</h4>
                  <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">Cognixia</p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN (Card & Timeline) */}
          <div className="space-y-8">
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t border-b border-gray-200 dark:border-zinc-800">
              
              <div>
                <div className="font-black tracking-wide text-xl md:text-2xl mb-1 text-black dark:text-white">
                  AVAILABLE FOR ROLES
                </div>

                <div className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-400">
                  Open to Full-Stack & Software Engineering positions.
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="inline-block text-xs font-mono font-bold border border-gray-300 dark:border-zinc-700 px-3 py-1.5 rounded-sm text-gray-800 dark:text-gray-200">
                  BSCS 2026
                </div>
              </div>

            </div>

            {/* Experience Timeline */}
            <section className="pt-4">
              <h2 className="text-2xl font-bold mb-8">Journey & Experience</h2>
              
              <div className="relative border-l border-gray-200 dark:border-zinc-800 ml-3 space-y-8">
                
                {/* Seelai */}
                <div className="relative pl-8 group">
                  <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-black dark:bg-white border border-black dark:border-white rounded-sm group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                    <h3 className="font-bold text-black dark:text-white">Seelai</h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2026</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-300 mb-1.5">Thesis Project | Full Stack Developer</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">Mobile application for the partially sighted with real-time object detection, caretaker face recognition, document scanning, text-to-speech functionality, and other assistive features.</p>
                </div>

                {/* ODCI */}
                <div className="relative pl-8 group">
                  <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                    <h3 className="font-bold text-black dark:text-white">ODCI (Document Tracker)</h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Full Stack Developer (OJT) | Full Stack Developer</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">Centralized role-based document tracking system engineered collaboratively to efficiently route and monitor document lifecycles.</p>
                </div>

                {/* AlgoVerse */}
                <div className="relative pl-8 group">
                  <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                    <h3 className="font-bold text-black dark:text-white">AlgoVerse</h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Operating Systems Final Project | Full Stack Developer</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">Web-based visual simulator for CPU scheduling algorithms (FCFS, SJF, Round Robin) for educational purposes.</p>
                </div>

                {/* Jayann's Store POS */}
                <div className="relative pl-8 group">
                  <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                    <h3 className="font-bold text-black dark:text-white">Jayann&apos;s Store POS System</h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Application Development and Emerging Technologies Final Project | Full Stack Developer</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">Web-based POS platform functioning as an e-commerce site utilizing PHP and MySQL.</p>
                </div>
                
                {/* Sari-tech */}
                <div className="relative pl-8 group">
                  <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                    <h3 className="font-bold text-black dark:text-white">Sari-tech</h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Software Engineering II Final Project | Full Stack Developer</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">Comprehensive software engineering project serving as the capstone for the course.</p>
                </div>

                {/* Smart Cook */}
                <div className="relative pl-8 group">
                  <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                    <h3 className="font-bold text-black dark:text-white">Smart Cook</h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2024</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Software Engineering I Final Project | Full Stack Developer</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">Recipe finder web app built with Vanilla JS and the Edamam API to filter meals based on dietary needs.</p>
                </div>

                {/* Hello World */}
                <div className="relative pl-8 group">
                  <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-gray-100 dark:bg-zinc-900 border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                    <h3 className="font-bold text-gray-500 dark:text-gray-400">Hello World! 👋🏻</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-mono mt-1 xl:mt-0">2022</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500 italic">Wrote my first line of code.</p>
                </div>

              </div>
            </section>

          </div>
        </div>

        {/* FULL WIDTH BOTTOM GRID (Now spanning both columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 mt-16 border-t border-gray-200 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-bold mb-4">Focus Areas</h3>

            <ul className="flex flex-wrap gap-2 text-sm text-gray-900 dark:text-gray-400">
              <li className="flex items-center gap-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                Data Structures <ExternalLink size={12} className="opacity-70" />
              </li>

              <li className="flex items-center gap-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                Machine Learning <ExternalLink size={12} className="opacity-70" />
              </li>

              <li className="flex items-center gap-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                System Architecture <ExternalLink size={12} className="opacity-70" />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4">Social Links</h3>
            <ul className="space-y-3 text-sm text-gray-900 dark:text-gray-400">
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-white cursor-pointer transition-colors"><GithubIcon size={14}/> GitHub</li>
              <li className="flex items-center gap-2 hover:text-black dark:hover:text-white cursor-pointer transition-colors"><Mail size={14}/> Email Me</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4">Reference</h3>
            <div className="text-xs text-gray-900 dark:text-gray-400 space-y-1">
              <p className="font-bold text-black dark:text-white text-sm">MICHELLE C. TANEGA, DIT</p>
              <p>Chairperson, IT Dept</p>
              <a href="mailto:mlmtanega@cvsu-naic.edu.ph" className="text-blue-600 hover:underline cursor-pointer block mt-1">mlmtanega@cvsu-naic.edu.ph</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4">Get in touch</h3>
            <p className="text-sm text-gray-900 dark:text-gray-400 mb-4 pr-4">
              Available for new opportunities in software development.
            </p>
            <a href="mailto:nc.angelitoiii.decatoria@cvsu.edu.ph" className="inline-flex items-center gap-2 text-sm font-bold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors group">
              Let&apos;s talk <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="pt-8 mt-4 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-900 dark:text-gray-400 pb-8">
          <p>&copy; 2026 Angelito P. Decatoria III. All rights reserved.</p>
          <a href="mailto:nc.angelitoiii.decatoria@cvsu.edu.ph" className="mt-4 md:mt-0 bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-semibold flex items-center gap-2 rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm">
            <Mail size={16}/> Connect with Thirdy
          </a>
        </footer>

      </div>
    </div>
  );
}