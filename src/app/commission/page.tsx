import NavBar from "../../components/NavBar"

export default function Commission() {
  return (
    <div className="bg-indigo-200 min-h-screen">
      <NavBar />
      <div className="max-w-md mx-auto mt-12 p-6 bg-rose-50 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Request a Commission</h2>
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Your Name" className="border p-2 rounded-lg"/>
          <input type="email" placeholder="Your Email" className="border p-2 rounded-lg"/>
          <textarea placeholder="Describe your commission" className="border p-2 rounded-lg h-32"/>
          <button className="bg-indigo-300 text-gray-800 p-2 rounded-full hover:bg-indigo-200 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
