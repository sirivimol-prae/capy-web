
export interface SkillItem {
    id: string;
    name: string;
    icon: string;
    level: number;
    category: string;
    description: string;
    image: string;
  }
  
  export interface SkillCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    gradient: string;
    borderColor: string;
    description: string;
  }
  
  export const skillsData: SkillItem[] = [
    { 
      id: "react",
      name: "React (TSX, JSX)", 
      level: 90, 
      icon: "⚛️", 
      category: "webdev",
      description: "Building modern, responsive user interfaces with React hooks and context API.",
      image: "/uploads/react.png"
    },
    { 
      id: "vue",
      name: "Vue.js", 
      level: 75, 
      icon: "🟢", 
      category: "webdev",
      description: "Creating interactive web applications with Vue.js ecosystem including Vue Router and Vuex.",
      image: "/uploads/vue.png"
    },
    { 
      id: "nextjs",
      name: "Next.js", 
      level: 85, 
      icon: "▲", 
      category: "webdev",
      description: "Developing server-side rendered and static websites with powerful React framework.",
      image: "/uploads/nextjs.png"
    },
    { 
      id: "nodejs",
      name: "Node.js", 
      level: 80, 
      icon: "📦", 
      category: "webdev",
      description: "Building scalable backend services and RESTful APIs.",
      image: "/uploads/nodejs.png"
    },
    { 
      id: "postgresql",
      name: "PostgreSQL", 
      level: 75, 
      icon: "🐘", 
      category: "webdev",
      description: "Designing and optimizing relational database schemas and queries.",
      image: "/uploads/postgresql.png"
    },
    { 
      id: "mysql",
      name: "MySQL", 
      level: 80, 
      icon: "🐬", 
      category: "webdev",
      description: "Managing and querying relational databases efficiently.",
      image: "/uploads/mysql.png"
    },
    { 
      id: "prisma",
      name: "Prisma", 
      level: 70, 
      icon: "🔺", 
      category: "webdev",
      description: "Using next-generation ORM for type-safe database access.",
      image: "/uploads/prisma.png"
    },
    { 
      id: "github",
      name: "GitHub", 
      level: 85, 
      icon: "🐙", 
      category: "webdev",
      description: "Managing code repositories, pull requests, and code reviews.",
      image: "/uploads/github.png"
    },
    { 
      id: "jira",
      name: "Jira", 
      level: 80, 
      icon: "📋", 
      category: "webdev",
      description: "Tracking issues and managing agile development processes.",
      image: "/uploads/jira.png"
    },
    { 
      id: "trello",
      name: "Trello", 
      level: 85, 
      icon: "📌", 
      category: "webdev",
      description: "Organizing projects with Kanban-style management boards.",
      image: "/uploads/trello.png"
    },
    
    // -----------------------------------Programming Languages----------------------------------------- //

    { 
      id: "php-lang",
      name: "PHP", 
      level: 85, 
      icon: "🐘", 
      category: "languages",
      description: "Creating server-side applications with object-oriented principles.",
      image: "/uploads/php.png"
    },
    { 
      id: "typescript",
      name: "TypeScript", 
      level: 90, 
      icon: "📝", 
      category: "languages",
      description: "Building type-safe applications with modern typescript features.",
      image: "/uploads/typescript.png"
    },
    { 
      id: "JavaScript",
      name: "JavaScript", 
      level: 90, 
      icon: "📝", 
      category: "languages",
      description: "Building type-safe applications with modern JavaScript features.",
      image: "/uploads/JavaScript.png"
    },
    { 
      id: "html",
      name: "HTML", 
      level: 95, 
      icon: "📄", 
      category: "languages",
      description: "Crafting semantic markup for accessible web pages.",
      image: "/uploads/html.png"
    },
    { 
      id: "css",
      name: "CSS", 
      level: 90, 
      icon: "🎨", 
      category: "languages",
      description: "Styling responsive layouts with modern CSS techniques and utility-first frameworks.",
      image: "/uploads/css.png"
    },
    { 
      id: "Tailwind",
      name: "Tailwind", 
      level: 90, 
      icon: "🎨", 
      category: "languages",
      description: "Styling responsive layouts with modern Tailwind techniques and utility-first frameworks.",
      image: "/uploads/Tailwind.png"
    },
    { 
      id: "kotlin",
      name: "Kotlin", 
      level: 70, 
      icon: "📱", 
      category: "languages",
      description: "Developing Android applications with modern Kotlin features.",
      image: "/uploads/kotlin.png"
    },
    
    // --------------------------------------------Tools & Platforms----------------------------------------- //

    { 
      id: "figma",
      name: "Figma", 
      level: 85, 
      icon: "🎨", 
      category: "tools",
      description: "Creating UI designs and collaborating with design teams.",
      image: "/uploads/figma.png"
    },
    { 
      id: "vscode",
      name: "VS Code", 
      level: 90, 
      icon: "💻", 
      category: "tools",
      description: "Utilizing the full power of extensions and customizations for efficient coding.",
      image: "/uploads/vscode.png"
    },
    { 
      id: "laragon",
      name: "Laragon", 
      level: 80, 
      icon: "🔄", 
      category: "tools",
      description: "Setting up local development environments for web projects.",
      image: "/uploads/laragon.png"
    },
    { 
      id: "xampp",
      name: "XAMPP", 
      level: 75, 
      icon: "🐘", 
      category: "tools",
      description: "Managing local Apache, MySQL, PHP development stacks.",
      image: "/uploads/xampp.png"
    },
    { 
      id: "androidstudio",
      name: "Android Studio", 
      level: 70, 
      icon: "📱", 
      category: "tools",
      description: "Building mobile apps with comprehensive Android development environment.",
      image: "/uploads/androidstudio.png"
    },
    { 
      id: "docker",
      name: "Docker", 
      level: 65, 
      icon: "🐳", 
      category: "tools",
      description: "Containerizing applications for consistent deployments.",
      image: "/uploads/docker.png"
    },
    { 
      id: "sqlite",
      name: "SQLite", 
      level: 80, 
      icon: "💾", 
      category: "tools",
      description: "Implementing embedded, file-based database solutions.",
      image: "/uploads/sqlite.png"
    },
    { 
      id: "firebase",
      name: "Firebase", 
      level: 75, 
      icon: "🔥", 
      category: "tools",
      description: "Building apps with real-time database and authentication services.",
      image: "/uploads/firebase.png"
    },
    { 
      id: "postman",
      name: "Postman", 
      level: 85, 
      icon: "📫", 
      category: "tools",
      description: "Testing and documenting APIs effectively.",
      image: "/uploads/postman.png"
    },
  ];
  
  export const skillCategories: SkillCategory[] = [
    {
      id: "webdev",
      name: "Web & Software Development",
      icon: "👨‍💻",
      color: "from-red-600 to-red-400",
      gradient: "bg-gradient-to-r from-red-600/20 to-red-400/20",
      borderColor: "border-red-500/50",
      description: "My expertise in both frontend and backend development technologies."
    },
    {
      id: "languages",
      name: "Programming Languages",
      icon: "💻",
      color: "from-blue-600 to-blue-400",
      gradient: "bg-gradient-to-r from-blue-600/20 to-blue-400/20",
      borderColor: "border-blue-500/50",
      description: "The programming languages I'm proficient in."
    },
    {
      id: "tools",
      name: "Tools & Platforms",
      icon: "🛠️",
      color: "from-purple-600 to-purple-400",
      gradient: "bg-gradient-to-r from-purple-600/20 to-purple-400/20",
      borderColor: "border-purple-500/50",
      description: "Development environments and platforms I work with."
    }
  ];
  
  export const skillGroups = {
    "webdev": {
      "Frontend": ["react", "vue", "nextjs"],
      "Backend": ["nodejs", "php"],
      "Database": ["postgresql", "mysql", "prisma"],
      "Others": ["selenium", "github", "jira", "trello"]
    },
    "languages": ["php-lang", "typescript", "html", "css", "kotlin"],
    "tools": {
      "Design": ["figma"],
      "Development Environments": ["vscode", "laragon", "xampp", "androidstudio"],
      "Database & API": ["docker", "supabase", "sqlite", "firebase", "postman"]
    }
  };