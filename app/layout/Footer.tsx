import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
        © {year} LoginApp. Fatkhulloh All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
