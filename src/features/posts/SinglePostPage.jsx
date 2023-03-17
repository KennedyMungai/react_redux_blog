import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'


const SinglePostPage = () =>
{
    const post = useSelector(selectPostById)

    return (
        <div>SinglePostPage</div>
    )
}

export default SinglePostPage