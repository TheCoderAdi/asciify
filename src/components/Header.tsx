import React from "react";
import { Code, Terminal } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-terminal-green/20">
      <div className="flex items-center space-x-2">
        <Terminal className="h-6 w-6 text-terminal-green" />
        <h1 className="text-xl font-bold text-terminal-green">
          ASCI<span className="animate-pulse">I</span>fy
        </h1>
      </div>
      <div className="flex items-center space-x-2 text-xs text-terminal-green/60">
        <Code className="h-4 w-4" />
        <span>v1.0.0</span>
        <span className="animate-cursor-blink">_</span>
      </div>
    </header>
  );
};

export default Header;
