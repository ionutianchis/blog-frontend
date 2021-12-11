import React, {useState, useEffect} from 'react'
import '../styles/Fullpost.css'
import { useParams, useNavigate } from 'react-router-dom'
import formatDistance from 'date-fns/formatDistance'

const Fullpost = ({ posts }) => {
    const { id } = useParams()

    const [currPost, setCurrPost] = useState({})
    
    const navigate = useNavigate()

    useEffect(() => {
        posts.forEach((post => {
            if (post._id === id) {
                setCurrPost(post)
            }
        }))
    }, [id, posts])
    console.log(currPost)
    return (
		<div className='fullpost-container'>
			
            <button onClick={() => navigate('/blog-api/')}>Go back</button>
			
            <h1>{currPost.title}</h1>
            
            <h3>by {currPost.author}</h3>

            {currPost.timestamp &&
			    <p>{formatDistance(new Date(currPost.timestamp), new Date())} ago</p>
            }
            
            <p className='post-text'>{currPost.text}</p>

			<div className='post-comments-container'>
				{currPost.comments &&
					currPost.comments.map((item, index) => {
						return (
							<div key={index} className='post-comment'>
								<p>{item.author}</p>
								<p>{item.timestamp}</p>
								<p>{item.text}</p>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default Fullpost