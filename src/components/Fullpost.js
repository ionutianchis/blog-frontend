import React, {useState, useEffect} from 'react'
import '../styles/Fullpost.css'
import { useParams, useNavigate } from 'react-router-dom'
import formatDistance from 'date-fns/formatDistance'

const Fullpost = () => {

	// Current post id
    const { id } = useParams()

    const [currPost, setCurrPost] = useState({})
    
    const [comment, setComment] = useState({})

    const navigate = useNavigate()

	// Geting post from DB
	async function fetchPostData() {
		try {
			const res = await fetch(`https://obscure-refuge-23971.herokuapp.com/api/posts/${id}`)
			const resJson = await res.json()
			setCurrPost(resJson.post)
		} catch (error) {
			console.error(error)
		}
	}

    useEffect(() => {
		fetchPostData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, comment])

	// Comment change
	const handleChange = (e) => {
		setComment({
			...comment,
			[e.target.name]: e.target.value,
		})
    }
	// Comment submit
    const handleSubmit = event => {
        event.preventDefault()
        fetch(`https://obscure-refuge-23971.herokuapp.com/api/posts/${id}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				author: comment.author,
				text: comment.text,
				reference: id,
			}),
		}).catch((err) => console.log(err))
		setComment({})
    }

    return (
		<div className='fullpost-container'>
			<button onClick={() => navigate('/blog-api/')}>Go back</button>

			<h1>{currPost.title}</h1>

			<h3>by {currPost.author}</h3>

			{currPost.timestamp && (
				<p>
					{formatDistance(new Date(currPost.timestamp), new Date())}{' '}
					ago
				</p>
			)}

			<p className='post-text'>{currPost.text}</p>

			<form onSubmit={handleSubmit}>
				<p>Got something to say ?</p>
				<input
					type='text'
					required={true}
					name='author'
					onChange={handleChange}
					placeholder='Enter your name'></input>
				<textarea
					type='text'
					required={true}
					name='text'
					onChange={handleChange}
					placeholder='Enter some text'/>
				<input type='submit'/>
			</form>

			<div className='post-comments-container'>
				{currPost.comments &&
					currPost.comments.map((item, index) => {
						return (
							<div key={index} className='post-comment'>
								<p>{item.text}</p>
								<p> by {item.author}</p>
								{item.timestamp && (
									<p>
										{formatDistance(
											new Date(item.timestamp),
											new Date()
										)}{' '}
										ago
									</p>
								)}
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default Fullpost