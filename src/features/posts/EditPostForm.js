import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllUsers } from '../users/usersSlice'
import { selectPostById, updatePost, deletePost } from './postsSlice'


const EditPostForm = () =>
{
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState(post?.userId)

    const dispatch = useDispatch()

    if (!post)
    {
        return (
            <section>Post Not Found!</section>
        )
    }

    const onContentChanged = e => setTitle(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onAuthorChanged = e => setTitle(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePostClicked = () => 
    {
        if (canSave)
        {
            try
            {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, body: content, userId, reactions: post.reactions })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`post/{postId}`)
            }
            catch (error)
            {
                console.error("Failed to save the post", error)
            }
            finally
            {
                setRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map((user) => 
    {
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    })

    const onDeletePostClicked = () => 
    {
        try
        {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        }
        catch (error)
        {
            console.error('Failed to delete the post', error)
        }
        finally
        {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2> Edit Post</h2>
            <form action="">
                <label htmlFor="postTitle">
                    Post Title:
                </label>
                <input
                    type='text'
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id='postAuthor'
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button
                    className="deleteButton"
                    type='button'
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
            </form>
        </section>
    )
}

export default EditPostForm