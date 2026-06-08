import Link from 'next/link';
import { 
  ArrowLeft, 
  Monitor, 
  Zap, 
  Rocket, 
  Database, 
  Wrench, 
  Bot 
} from 'lucide-react';

export default function TechStack() {
  const categories = [
    {
      title: "Programming Languages",
      icon: <Zap size={20} className="text-orange-500" />,
      items: [
        { name: "HTML5", bg: "bg-[#E34F26]", text: "text-white" },
        { name: "CSS3", bg: "bg-[#1572B6]", text: "text-white" },
        { name: "JAVASCRIPT", bg: "bg-[#F7DF1E]", text: "text-black" },
        { name: "TYPESCRIPT", bg: "bg-[#3178C6]", text: "text-white" },
        { name: "PHP", bg: "bg-[#777BB4]", text: "text-white" },
        { name: "DART", bg: "bg-[#0175C2]", text: "text-white" },
        { name: "PYTHON", bg: "bg-[#3776AB]", text: "text-white" },
      ]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Rocket size={20} className="text-pink-500" />,
      items: [
        { name: "REACT", bg: "bg-[#20232A]", text: "text-[#61DAFB]" },
        { name: "VITE", bg: "bg-[#646CFF]", text: "text-white" },
        { name: "NODE.JS", bg: "bg-[#339933]", text: "text-white" },
        { name: "EXPRESS.JS", bg: "bg-[#000000]", text: "text-white" },
        { name: "FLUTTER", bg: "bg-[#02569B]", text: "text-[#38BDF8]" },
        { name: "REACT NATIVE", bg: "bg-[#20232A]", text: "text-[#61DAFB]" },
        { name: "BOOTSTRAP", bg: "bg-[#7952B3]", text: "text-white" },
        { name: "TAILWINDCSS", bg: "bg-[#0F172A]", text: "text-[#38BDF8]" },
        { name: "CHAKRA UI", bg: "bg-[#319795]", text: "text-white" },
      ]
    },
    {
      title: "Databases",
      icon: <Database size={20} className="text-purple-500" />,
      items: [
        { name: "MYSQL", bg: "bg-[#4479A1]", text: "text-white" },
        { name: "FIREBASE", bg: "bg-[#039BE5]", text: "text-white" },
        { name: "SUPABASE", bg: "bg-[#3ECF8E]", text: "text-white" },
      ]
    },
    {
      title: "Tools, Platforms & Services",
      icon: <Wrench size={20} className="text-gray-500" />,
      items: [
        { name: "GIT", bg: "bg-[#F05032]", text: "text-white" },
        { name: "GITHUB", bg: "bg-[#181717]", text: "text-white" },
        { name: "FIGMA", bg: "bg-[#F24E1E]", text: "text-white" },
        { name: "VERCEL", bg: "bg-[#000000]", text: "text-white" },
        { name: "RENDER", bg: "bg-[#46E3B7]", text: "text-white" },
        { name: "CLOUDINARY", bg: "bg-[#3448C5]", text: "text-white" },
        { name: "TWILIO", bg: "bg-[#F22F46]", text: "text-white" },
        { name: "WORDPRESS", bg: "bg-[#21759B]", text: "text-white" },
      ]
    },
    {
      title: "AI / Machine Learning",
      icon: <Bot size={20} className="text-rose-500" />,
      items: [
        { name: "TENSORFLOW", bg: "bg-[#FF6F00]", text: "text-white" },
        { name: "TENSORFLOW LITE", bg: "bg-[#FF6F00]", text: "text-white" },
        { name: "OPENCV", bg: "bg-[#5C3EE8]", text: "text-white" },
        { name: "YOLOV8", bg: "bg-[#0000FF]", text: "text-white" },
        { name: "LABEL STUDIO", bg: "bg-[#FF7043]", text: "text-white" },
        { name: "ROBOFLOW", bg: "bg-[#424242]", text: "text-white" },
        { name: "GOOGLE COLAB", bg: "bg-[#F9AB00]", text: "text-white" },
        { name: "JUPYTER", bg: "bg-[#F37626]", text: "text-white" },
        { name: "KAGGLE", bg: "bg-[#20BEFF]", text: "text-white" },
      ]
    }
  ];

  return (
    <div className="min-h-screen text-black dark:text-gray-100 font-sans selection:bg-[#8B5CF6] selection:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* Navigation Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Monitor size={32} className="text-[#8B5CF6]" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Tech Stack</h1>
          </div>
        </div>

        {/* Tech Stack Categories */}
        <div className="space-y-12">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              
              {/* Category Header */}
              <div className="flex items-center gap-3">
                {category.icon}
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              
              {/* Divider */}
              <hr className="border-gray-200 dark:border-zinc-800" />
              
              {/* Badges Container */}
              <div className="flex flex-wrap gap-2 pt-2">
                {category.items.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className={`
                      ${tech.bg} ${tech.text} 
                      px-3 py-1.5 text-xs font-bold tracking-wider rounded-sm 
                      shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity cursor-default
                    `}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}