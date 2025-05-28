const Home = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Your Name</h1>
        <p className="text-gray-400 text-lg">
          Software engineer focused on building minimal and effective solutions.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="text-gray-400">
            Brief description about yourself and your work. Keep it concise and
            impactful.
          </p>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
