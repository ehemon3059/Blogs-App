import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Components/Loader'


const Authors = () => {

  const [authors,setAuthors] = useState([])

  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{

    const getAuthor = async () =>{
      setIsLoading(true)
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users`)
      setAuthors(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  getAuthor();
  },[])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="authors">
     { authors.length > 0 ?  <div className="container authors__container">
        
        {
          authors.map(({_id:id,avatar,name,posts})=>{
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author__avatar">
                <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`image of ${name}`}/>
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts} POST</p>
              </div>
            </Link>
          })
        }
        
      </div> :<h2 className='center'>No users/Authors Found</h2>}
    </section>
  )
}

export default Authors
