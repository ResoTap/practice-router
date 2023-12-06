import Post from "./post"

const Feed = ({ posts }) => {
    return (
        <>
            {posts.map(post => (
                <Post key={post.id} pos={post} />
            ))}
        </>
    )
}

export default Feed