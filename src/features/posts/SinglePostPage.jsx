import React from 'react'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'


const SinglePostPage = () =>
{
    const post = useSelector(selectPostById)

    return (
        <div>SinglePostPage</div>
    )
}

export default SinglePostPage