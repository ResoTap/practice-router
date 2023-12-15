import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
    return (
        <main className="NewPost">
            {editTitle && 
                <>
                    <h2>New Post</h2>
                    <form className="newPostForm" onSubmit={handleSubmit}>
                        <label htmlFor="postTitle">Title:</label>
                        <input 
                            type="text" 
                            id="postTitle"
                            required
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea 
                            name="postBody" 
                            id="postBody"
                            required
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)} 
                            cols="30" 
                            rows="10"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </>
            }           
        </main>
    )
}