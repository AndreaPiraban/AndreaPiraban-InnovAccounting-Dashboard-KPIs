export default function Sidebar() {
  return (
      <aside className="fixed top-0 left-0 z-20 hidden w-64 h-full pt-16 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:block">
      <ul className="flex flex-col p-4 gap-2">
        {/* Elemento tipo Flowbite */}
        <li>
          <a
            href=""
            className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {/* Icono SVG */}
            <svg
              className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>

            {/* Texto */}
            <span className="ml-3">Dashboard</span>
          </a>
        </li>

        
      </ul>
    </aside>

  )
}
