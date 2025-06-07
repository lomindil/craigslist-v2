import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            {/* <a className="text-2xl font-bold">Craigslist Improved</a> */}
            Craigslist Improved
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/auth/login" className={`hover:underline ${router.pathname === '/auth/login' ? 'font-bold' : ''}`}>
                  {/* <a className={`hover:underline ${router.pathname === '/auth/login' ? 'font-bold' : ''}`}>Login</a> */}
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className={`hover:underline ${router.pathname === '/auth/register' ? 'font-bold' : ''}`}>
                  {/* <a className={`hover:underline ${router.pathname === '/auth/register' ? 'font-bold' : ''}`}>Register</a> */}
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
