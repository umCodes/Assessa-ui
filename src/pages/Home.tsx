import { Link } from "react-router-dom"
import LerningImage from "../assets/Learning-pana.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const {user} = useContext(AuthContext);
  return (
    <div className="py-8 px-6 flex flex-col items-center justify-center gap-8 h-full">

      <img className="block w-[70%] max-w-[400px]" src={LerningImage} alt="learning" />
        <div>    
            <h1 className="text-xl min-md:text-2xl font-bold text-center my-2">Turn Your Lecture Slides into Practice Exams ✨</h1>
            <h3 className="mx-4 text-zinc-800 text-center">Boost your learning with AI-generated practice tests tailored for you.</h3>
        </div>
        <div>
            <Link to={user ? '/lab' : '/register'} className='bg-[#f24c7c] text-white p-2 rounded-md text-md font-semibold m-8'>
                Get Started Now
            </Link>
        </div>
    </div>
  )
}

export default Home