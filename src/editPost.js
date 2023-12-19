import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from './api/posts'
import DataContext from './context/dataContext';

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { id } = useParams();
    const history = useNavigate();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
            setEditTitle('');
            setEditBody('');
            history('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
            console.log(`id: ${id}`);
        }
    }

    return (
        <main className="NewPost">
            {editTitle && 
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input 
                            type="text" 
                            id="postTitle"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea 
                            name="postBody" 
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)} 
                            cols="30" 
                            rows="10"
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }    
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Hamepage.</Link>
                    </p>
                </>
            }       
        </main>
    )
}

export default EditPost