const NewPost = ({
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody
}) => {
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input 
                    type="text" 
                    id="postTitle"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle=(e.target.value)}
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
                ></textarea>
            </form>
        </main>
    )
}

export default NewPost