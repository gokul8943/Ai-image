import { useState, useEffect } from "react"
import  Card  from '../components/Card'
import FormField from "../components/FormField"
import Loader from '../components/Loader'


const Home = () => {

    const [loading, setLoading] = useState(false)
    const [allPost, setAllPost] = useState(null)

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-black ">The Community Showcase</h1>
            </div>
        </section>
    )
}

export default Home
