import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  return (
    <nav className="border-b border-gray-700 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-xl font-semibold">
          Your Name
        </a>

        <div className="flex items-center space-x-6">
          <a href="/projects" className="hover:text-gray-400 transition-colors">
            Projects
          </a>
          <a href="/articles" className="hover:text-gray-400 transition-colors">
            Articles
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
