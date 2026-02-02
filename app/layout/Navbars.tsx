'use client'
import Link from "next/link"

const Navbars = () => {
  return (
        <nav className="w-full bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">
                Test_Fatkhulloh
                </h1>

                <div className="flex items-center gap-6 text-gray-600 font-medium">
                <Link href="/" className="hover:text-blue-600">
                    Beranda
                </Link>
                <Link href="/about" className="hover:text-blue-600">
                    About
                </Link>
                <Link href="/login"
                    className="px-5 py-2 items-center rounded-full bg-blue-600 text-white font-semibold 
                                hover:bg-blue-700 transition shadow-sm">
                    Login
                    </Link>

                </div>
            </div>
        </nav>
  )
}

export default Navbars
