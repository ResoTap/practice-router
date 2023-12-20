import { useParams, Link, useNavigate } from "react-router-dom"
import { useStoreState, useStoreActions } from "easy-peasy"

const PostPage = () => {
    const history = useNavigate();
    const { id } = useParams();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);

    const handleDelete = async (id) => {
        deletePost(id);
        history('/');
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post && 
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Hamepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage