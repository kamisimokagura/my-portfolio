import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, Instagram, Facebook, ChevronDown } from 'lucide-react';

// --- Types & Data ---

type ProjectType = 'AI-driven Development (under development)'| 'original' | 'clone' | 'practice' ;

type Project = {
  id: number;
  title: string;
  category: string;
  type: ProjectType;
  image: string;
  link: string;
  year: string;
};

// =========================================================================
// 【編集用エリア】ここにあなたの制作物を入力してください
// 画像ファイルは public/images フォルダを作成して入れてください。
// =========================================================================
const projects: Project[] = [
  {
    id: 0,
    title: "media-editor-platform ",
    category: "AI-driven Development (under development) / media-editor-platform",
    type: "AI-driven Development (under development)",
    image: "images/K.png",
    link: "http://localhost:3000",  // Next.js なので別サーバーで起動。デプロイ後は本番URLに変更
    year: "2026"
  },
  {
    id: 1,
    title: "web-writing-final",
    category: "Original / web-writing-final",
    type: "original",
    image: "images/J.png",
    link: "web-writing-final/web-writing-final 1.html",
    year: "2026"
  },
  {
    id: 2,
    title: "jiwa nusantara",
    category: "Original / EC like site",
    type: "original",
    image: "images/I.png",
    link: "/jiwa-nusantara/index.html",
    year: "2025"
  },
  {
    id: 3,
    title: "Tech Blog",
    category: "Practice / Media",
    type: "practice",
    image: "images/E.png",
    link: "Coating Advanced Arrangement/index.html",
    year: "2024"
  },
  {
    id: 4,
    title: "Culinary Journal",
    category: "Original / Lifestyle",
    type: "original",
    // 画像は "images/ファイル名.png" のように指定します
    image: "images/F.png", 
    link: "Cooking Blog/index.html",
    year: "2024"
  },
  {
    id: 5,
    title: "Tourism LP",
    category: "Original / Landing Page",
    type: "original",
    image: "images/G.png",
    link: "Tourism LP/index.html",
    year: "2024"
  },
  {
    id: 6,
    title: "Gaming Gadgets",
    category: "Original / Product Site",
    type: "original",
    image: "images/H.png",
    link: "Version with gaming-gadgets-site file structure removed/index.html",
    year: "2024"
  },
  {
    id: 7,
    title: "Apple Clone",
    category: "Clone / UI Design",
    type: "clone",
    image: "images/B.png",
    link: "APPLE/index.html",
    year: "2023"
  },
  {
    id: 8,
    title: "Coating Bike",
    category: "Practice / Development",
    type: "practice",
    image: "images/A.png",
    link: "Coating Introductory Arrangement/index.html",
    year: "2023"
  },
  {
    id: 9,
    title: "Photographer Portfolio",
    category: "Practice / Design",
    type: "practice",
    image: "images/C.png",
    link: "Coating Elementary Arrangement/index.html",
    year: "2023"
  },
  {
    id: 10,
    title: "Modern Furniture",
    category: "Practice / E-Commerce",
    type: "practice",
    image: "images/D.png",
    link: "Coating Intermediate Arrangement/index.html",
    year: "2023"
  },
];

// --- Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('filter-btn')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9999] blend-difference flex items-center justify-center mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {isHovering && <ArrowUpRight className="text-black w-3 h-3" />}
    </motion.div>
  );
};

const Nav = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'work', 'about', 'contact'];
      // Offset allows detection before the section is fully at the top
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white"
    >
      <a 
        href="#intro" 
        onClick={scrollTo('intro')}
        className="text-xl md:text-2xl font-bold serif tracking-tighter hover:opacity-70 transition-opacity cursor-pointer z-50 pointer-events-auto"
      >
        AL.
      </a>
      {/* Mobile Nav Visible for accessibility, structured as list */}
      <ul className="flex space-x-6 md:space-x-12 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase z-50">
        {navItems.map((item) => (
          <li key={item.id} className="relative group">
            <a 
              href={`#${item.id}`} 
              onClick={scrollTo(item.id)}
              className={`hover:opacity-100 transition-opacity duration-300 block py-2 ${activeSection === item.id ? 'opacity-100' : 'opacity-50'}`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section id="intro" className="h-screen w-full flex flex-col justify-center px-6 md:px-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(50,50,50,0.2),_rgba(0,0,0,1))]"></div>
      </div>
      
      <div className="z-10 mt-20 relative select-none">
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] leading-[0.85] serif font-medium text-white mix-blend-difference tracking-tighter"
          >
            Creative
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] leading-[0.85] serif font-medium text-[#555] ml-[10vw] tracking-tighter"
          >
            Developer
          </motion.h1>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 right-6 md:right-20 flex flex-col md:flex-row gap-12 items-end md:items-start text-right md:text-left z-20"
      >
         <div className="hidden md:block w-px h-24 bg-gradient-to-b from-gray-800 to-transparent"></div>
         
         <div className="flex flex-col gap-6">
            <div className="border-l-2 border-white pl-4 md:border-l-0 md:pl-0">
                <p className="font-sans text-sm md:text-base leading-relaxed text-gray-200 tracking-wide font-light">
                    円滑なコミュニケーションを心掛け<br/>
                    作業の効率化と品質向上を目指します。
                </p>
            </div>
            <div className="md:border-l border-gray-800 md:pl-4">
                <p className="font-sans text-xs md:text-sm leading-relaxed text-gray-500 tracking-wider font-light">
                    Prioritizing seamless communication,<br/>
                    I craft digital experiences that<br/>
                    enhance efficiency and value.
                </p>
            </div>
         </div>
         
         <div className="hidden md:flex flex-col justify-between h-full text-xs font-mono text-gray-600 uppercase tracking-widest text-right">
             <span>Based in Japan</span>
             <span>Freelance</span>
         </div>
      </motion.div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full border-t border-gray-800 py-12 md:py-20 relative overflow-hidden"
        >
          {/* Content Layer - Z-Index 20 to stay above image */}
          {/* Changed grid breakpoint to lg to ensure tablets stack vertically */}
          <div className="relative z-20 px-6 md:px-20 transition-all duration-500 group-hover:px-12 md:group-hover:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Title Section - Occupies more space on Desktop */}
              <div className="lg:col-span-6 mix-blend-difference text-white overflow-hidden">
                <span className="text-xs font-mono text-gray-400 mb-2 md:mb-3 block">0{project.id} — {project.year}</span>
                {/* Responsive font sizing and break-words to prevent overlap */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl serif font-light tracking-tight leading-[1.1] break-words">
                  {project.title}
                </h3>
              </div>

              {/* Category Section */}
              <div className="lg:col-span-3 text-left lg:text-center mix-blend-difference text-white">
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium text-gray-300 block">
                  {project.category}
                </span>
              </div>

              {/* Action Section */}
              <div className="lg:col-span-3 text-left lg:text-right opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 text-xs md:text-sm whitespace-nowrap">
                  View Project <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                </span>
              </div>

            </div>
          </div>

          {/* Hover Background Image Reveal - Z-Index 10 */}
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-black/50 z-20"></div>
            <img 
              src={project.image} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/1920x1080/1a1a1a/FFF?text=Project+Preview';
              }}
            />
          </div>
        </a>
    </motion.div>
  );
};

const Work = () => {
  const [filter, setFilter] = useState<'all' | ProjectType>('all');
  const [visibleProjects, setVisibleProjects] = useState(3);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleProjects(3);
  }, [filter]);

  const filteredProjects = projects.filter(p => filter === 'all' ? true : p.type === filter);
  // Only slice the projects if we are not showing all
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMore = filteredProjects.length > visibleProjects;

  const handleShowMore = () => {
    setVisibleProjects(prev => prev + 4);
  };

  const filters = [
    { key: 'all', label: 'All', jp: '全て' },
    { key: 'AI-driven Development (under development)', label: 'AI-driven Development (under development)', jp: 'AI駆動開発（開発中）' },
    { key: 'original', label: 'Originals', jp: '制作物' },
    { key: 'clone', label: 'Clones', jp: 'クローン' },
    { key: 'practice', label: 'Practice', jp: '模写' },
  ];

  return (
    <section id="work" className="w-full py-20 bg-[#050505]">
      <div className="px-6 md:px-20 mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-900 pb-6 gap-6">
        <div className="flex flex-col gap-2">
           <div className="flex items-baseline gap-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white">Selected Works</h2>
              <span className="text-xs text-gray-600 font-light hidden sm:inline-block">/</span>
              <span className="text-xs text-gray-500 font-light tracking-wider hidden sm:inline-block">制作実績</span>
           </div>
           <p className="text-xs text-gray-400 font-light mt-1">
             Originals, Clones, and Coding Practice
           </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
           {filters.map((f) => (
             <button
               key={f.key}
               onClick={() => setFilter(f.key as any)}
               className={`filter-btn relative px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300 ${filter === f.key ? 'text-white' : 'text-gray-600 hover:text-gray-300'}`}
             >
               {f.label} <span className="text-[9px] opacity-60 ml-1">({f.jp})</span>
               {filter === f.key && (
                 <motion.div 
                   layoutId="activeFilter"
                   className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                 />
               )}
             </button>
           ))}
        </div>
      </div>

      <div className="w-full min-h-[50vh] flex flex-col items-center">
        <AnimatePresence mode="wait">
            <motion.div layout className="w-full">
                {displayedProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </motion.div>
        </AnimatePresence>
        
        {displayedProjects.length === 0 && (
           <div className="py-20 text-center text-gray-600 font-mono text-sm">
             No projects found in this category.
           </div>
        )}

        {hasMore && (
           <motion.button 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             onClick={handleShowMore}
             className="mt-12 group flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-pointer"
           >
              <span className="text-xs font-mono uppercase tracking-widest">View More Works</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
           </motion.button>
        )}
      </div>
    </section>
  );
};

const About = () => {
    const scrollToWork = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('work');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <section id="about" className="min-h-screen flex items-center bg-[#0a0a0a] px-6 md:px-20 py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full max-w-8xl mx-auto relative z-10">
        
        {/* Left Column: Title & Info */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">Who I Am</span>
            <h2 className="serif text-6xl md:text-8xl leading-none mb-6">
              About<br/><span className="text-gray-700">Me.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-0"
          >
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 text-sm font-mono border-t border-gray-800 pt-8">
                <div>
                  <span className="block text-gray-600 mb-2 text-[10px] uppercase tracking-wider">Name / 名前</span>
                  <span className="text-white text-base">AL</span>
                </div>
                <div>
                  <span className="block text-gray-600 mb-2 text-[10px] uppercase tracking-wider">Age / 年齢</span>
                  <span className="text-white text-base">21</span>
                </div>
                <div>
                  <span className="block text-gray-600 mb-2 text-[10px] uppercase tracking-wider">Role / 職業</span>
                  <span className="text-white text-base">Freelance (フリー)</span>
                </div>
                <div>
                   <span className="block text-gray-600 mb-2 text-[10px] uppercase tracking-wider">Skills / スキル</span>
                   <span className="text-white text-sm leading-relaxed block">
                    HTML/CSS, JavaScript<br/>
                    Design (Figma, Canva)
                   </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-gray-600 mb-2 text-[10px] uppercase tracking-wider">Interests / 趣味</span>
                  <span className="text-white text-xs leading-relaxed block">
                    FPS Games, Sports, Movies<br/>
                    Outdoor, Watching Videos<br/>
                    <span className="text-[10px] text-gray-500 mt-1 block">ゲーム(FPS), スポーツ観戦, 映画,<br/>アウトドア, 動画視聴</span>
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <span className="block text-gray-600 mb-2 text-[10px] uppercase tracking-wider">Availability / 稼働時間</span>
                    <span className="text-white text-xs leading-relaxed block">
                        Weekdays: 12:00 - 27:00<br/>
                        Weekends: 10:00 - 24:00<br/>
                        <span className="text-[10px] text-gray-500 mt-1 block">平日: 12:00-27:00, 休日: 10:00-24:00</span>
                    </span>
                </div>
              </div>
          </motion.div>
        </div>

        {/* Right Column: Image & Bilingual Text */}
        <div className="lg:col-span-7 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full aspect-video overflow-hidden bg-gray-900"
            >
              <img 
                src="images/omggg1.png" 
                alt="Workspace" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop';
                }}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-10"
            >
              <div className="space-y-6">
                 <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Japanese</h3>
                 <div className="text-gray-300 leading-loose text-justify font-light text-sm md:text-base">
                    <p className="mb-6">
                    理数文系を修了し、当初はIT分野への道を遠く感じていましたが、素晴らしい講師の方々との出会いにより、技術を学ぶ楽しさと奥深さを知りました。現在は「お客様の期待を超える」をモットーに、ニーズに合わせたスキルアップを欠かさず、「あなたに任せてよかった」と言っていただけるような制作を心がけています。
                    </p>
                    <a 
                      href="#work" 
                      onClick={scrollToWork}
                      className="inline-flex items-center gap-2 text-white border-b border-white/30 hover:border-white pb-1 transition-colors cursor-pointer group"
                    >
                        <span>少ないですが、私が制作致しましたサイトを見ていただくと幸いです。</span>
                        <ArrowUpRight className="w-3 h-3 transform transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                 </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">English</h3>
                 <div className="text-gray-400 leading-loose text-justify font-light text-sm md:text-base">
                    <p className="mb-6">
                    Though I started from a liberal arts background, excellent mentorship revealed the creative potential of development. Today, I am driven by the goal of exceeding client expectations. I constantly refine my technical craft to ensure every project concludes with a sense of trust and satisfaction, aiming to be a partner you can rely on.
                    </p>
                    <a 
                      href="#work" 
                      onClick={scrollToWork}
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-white border-b border-gray-700 hover:border-gray-500 pb-1 transition-colors cursor-pointer group"
                    >
                        <span>Please take a look at my work.</span>
                        <ArrowUpRight className="w-3 h-3 transform transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                 </div>
              </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-20 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Ambient */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(20,20,20,1),_rgba(0,0,0,1))]"></div>
      
      <div className="max-w-3xl mx-auto w-full z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <div className="inline-block border-b border-white mb-6 pb-2">
             <h2 className="text-xs font-mono tracking-[0.4em] uppercase text-white">Contact</h2>
          </div>
          <p className="text-3xl md:text-5xl serif text-white font-medium mb-2">Let's work together.</p>
          <p className="text-gray-400 font-light text-sm">制作の依頼、ご質問などお気軽にお問い合わせください。</p>
        </motion.div>
        
        <motion.form
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           viewport={{ once: true }}
           className="w-full space-y-10"
           onSubmit={(e) => e.preventDefault()}
        >
           <div className="grid md:grid-cols-2 gap-10">
               <div className="group relative">
                   <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Name</label>
                   <input 
                     type="text" 
                     id="name" 
                     className="w-full bg-transparent border border-gray-800 focus:border-white text-white p-3 outline-none transition-colors duration-300 text-sm placeholder-gray-800"
                     placeholder="Your Name"
                   />
               </div>
               <div className="group relative">
                   <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Email</label>
                   <input 
                     type="email" 
                     id="email" 
                     className="w-full bg-transparent border border-gray-800 focus:border-white text-white p-3 outline-none transition-colors duration-300 text-sm placeholder-gray-800"
                     placeholder="your@email.com"
                   />
               </div>
           </div>

           <div className="group relative">
               <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Message</label>
               <textarea 
                 id="message" 
                 rows={6}
                 className="w-full bg-transparent border border-gray-800 focus:border-white text-white p-4 outline-none transition-colors duration-300 text-sm resize-none placeholder-gray-800"
                 placeholder="Tell me about your project..."
               ></textarea>
           </div>

           <div className="flex gap-6 pt-4">
              <button className="px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors">
                  Send Message
              </button>
              <button type="reset" className="px-8 py-3 bg-transparent border border-gray-800 text-white text-xs font-bold tracking-[0.2em] uppercase hover:border-white transition-colors">
                  Reset
              </button>
           </div>
        </motion.form>

        <div className="flex justify-center md:justify-start gap-8 mt-20">
          {[
            { Icon: Twitter, href: "https://x.com/", label: "Twitter" },
            { Icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
            { Icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
            { Icon: Github, href: "https://github.com/", label: "Github" },
          ].map(({ Icon, href, label }, i) => (
            <a 
              key={i} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 hover:border-white text-gray-500 hover:text-white transition-all duration-300"
            >
                <Icon size={16} />
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center md:text-left">
           <p className="text-[10px] text-gray-600 uppercase tracking-widest">&copy; {new Date().getFullYear()} AL Portfolio.</p>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);