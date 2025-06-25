const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-500">
          © {new Date().getFullYear()} <span className="font-bold text-xl">LibroMágico</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
