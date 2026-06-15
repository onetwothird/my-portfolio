import Link from 'next/link';
import { ArrowLeft, ScanLine, BrainCircuit, Tag } from 'lucide-react';
import { 
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiPhp, SiDart, SiPython,
  SiReact, SiVite, SiNodedotjs, SiExpress, SiFlutter, SiBootstrap, 
  SiTailwindcss, SiChakraui, SiMysql, SiFirebase, SiSupabase,
  SiGit, SiGithub, SiFigma, SiVercel, SiRender, SiCloudinary, 
  SiTwilio, SiWordpress, SiTensorflow, SiOpencv, SiGooglecolab, 
  SiJupyter, SiKaggle, SiHuggingface
} from 'react-icons/si';

export default function TechStack() {
  const categories = [
    {
      title: "Programming Languages",
      items: [
        { name: "HTML5", color: "#E34F26", icon: <SiHtml5 size={18} /> },
        { name: "CSS3", color: "#1572B6", icon: <SiCss size={18} /> },
        { name: "JAVASCRIPT", color: "#F7DF1E", icon: <SiJavascript size={18} /> },
        { name: "TYPESCRIPT", color: "#3178C6", icon: <SiTypescript size={18} /> },
        { name: "PHP", color: "#777BB4", icon: <SiPhp size={18} /> },
        { name: "DART", color: "#0175C2", icon: <SiDart size={18} /> },
        { name: "PYTHON", color: "#3776AB", icon: <SiPython size={18} /> },
      ]
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { name: "REACT", color: "#61DAFB", icon: <SiReact size={18} /> },
        { name: "VITE", color: "#646CFF", icon: <SiVite size={18} /> },
        { name: "NODE.JS", color: "#339933", icon: <SiNodedotjs size={18} /> },
        { name: "EXPRESS.JS", color: "#000000", icon: <SiExpress size={18} /> },
        { name: "FLUTTER", color: "#02569B", icon: <SiFlutter size={18} /> },
        { name: "REACT NATIVE", color: "#61DAFB", icon: <SiReact size={18} /> },
        { name: "BOOTSTRAP", color: "#7952B3", icon: <SiBootstrap size={18} /> },
        { name: "TAILWINDCSS", color: "#38BDF8", icon: <SiTailwindcss size={18} /> },
        { name: "CHAKRA UI", color: "#319795", icon: <SiChakraui size={18} /> },
      ]
    },
    {
      title: "Databases",
      items: [
        { name: "MYSQL", color: "#4479A1", icon: <SiMysql size={18} /> },
        { name: "FIREBASE", color: "#FFCA28", icon: <SiFirebase size={18} /> },
        { name: "SUPABASE", color: "#3ECF8E", icon: <SiSupabase size={18} /> },
      ]
    },
    {
      title: "Tools, Platforms, & Services",
      items: [
        { name: "GIT", color: "#F05032", icon: <SiGit size={18} /> },
        { name: "GITHUB", color: "#181717", icon: <SiGithub size={18} /> },
        { name: "FIGMA", color: "#F24E1E", icon: <SiFigma size={18} /> },
        { name: "VERCEL", color: "#000000", icon: <SiVercel size={18} /> },
        { name: "RENDER", color: "#46E3B7", icon: <SiRender size={18} /> },
        { name: "CLOUDINARY", color: "#3448C5", icon: <SiCloudinary size={18} /> },
        { name: "TWILIO", color: "#F22F46", icon: <SiTwilio size={18} /> },
        { name: "WORDPRESS", color: "#21759B", icon: <SiWordpress size={18} /> },
      ]
    },
    {
      title: "AI / Machine Learning",
      items: [
        { name: "TENSORFLOW", color: "#FF6F00", icon: <SiTensorflow size={18} /> },
        { name: "TENSORFLOW LITE", color: "#FF6F00", icon: <SiTensorflow size={18} /> },
        { name: "OPENCV", color: "#5C3EE8", icon: <SiOpencv size={18} /> },
        { name: "YOLOV8", color: "#0000FF", icon: <ScanLine size={18} /> },
        { name: "LABEL STUDIO", color: "#FF7043", icon: <Tag size={18} /> },
        { name: "ROBOFLOW", color: "#424242", icon: <BrainCircuit size={18} /> },
        { name: "GOOGLE COLAB", color: "#F9AB00", icon: <SiGooglecolab size={18} /> },
        { name: "JUPYTER", color: "#F37626", icon: <SiJupyter size={18} /> },
        { name: "KAGGLE", color: "#20BEFF", icon: <SiKaggle size={18} /> },
        { name: "HUGGING FACE", color: "#FFD21E", icon: <SiHuggingface size={18} /> },
      ]
    }
  ];

  return (
    <div className="min-h-screen text-black dark:text-gray-100 font-sans selection:bg-[#8B5CF6] selection:text-white transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        <div className="mb-16 animate-slide-up">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Tech Stack</h1>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl">
            A comprehensive overview of the programming languages, frameworks, databases, and architectural tools I leverage to build robust applications.
          </p>
        </div>

        <div className="space-y-16 pb-12">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="space-y-6 animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              
              <div className="border-b border-gray-200 dark:border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
                {category.items.map((tech, techIndex) => (
                  <div 
                    key={techIndex} 
                    className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-zinc-800/80 hover:border-gray-400 dark:hover:border-zinc-600 transition-colors duration-200 cursor-default"
                  >
                    <div 
                      className="transition-transform duration-200 group-hover:scale-110"
                      style={{ color: tech.color }}
                    >
                      {tech.icon}
                    </div>
                    
                    <span className="font-semibold tracking-wide text-sm text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
              
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}