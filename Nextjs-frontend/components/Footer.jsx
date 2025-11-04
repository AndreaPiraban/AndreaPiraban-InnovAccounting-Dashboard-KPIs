export default function Footer() {
  return (
    <footer className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        © {new Date().getFullYear()} Flowbite Dashboard
      </p>
    </footer>
  )
}
