export default function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-200 dark:border-neutral-700 py-6">
      <div className="container mx-auto px-4 text-center text-neutral-500 dark:text-neutral-400 text-sm">
        <p>SpeedRead - Improve your reading speed with science-based methods</p>
        <p className="mt-2">© {new Date().getFullYear()} SpeedRead App. All rights reserved.</p>
      </div>
    </footer>
  );
}
