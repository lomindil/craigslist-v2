import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PostForm from '../../components/Posts/PostForm'
import TopicForm from '../../components/Topics/TopicForm'

export default function TopicPage() {
  const router = useRouter()
  const { id } = router.query
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchTopic = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/topics/${id}`)
        setTopic(response.data)
      } catch (error) {
        console.error('Error fetching topic:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!topic) return <div>Topic not found</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{topic.name}</h1>
      <p className="text-gray-600 mb-6">{topic.description}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
        <PostForm topicId={topic.id} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create Subtopic</h2>
        <TopicForm parentId={topic.id} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        {topic?.posts?.length > 0 ? (
          <div className="space-y-4">
            {topic.posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <p className="text-sm text-gray-500 mt-2">Posted by: {post.user.username}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts yet.</p>
        )}
      </div>

      {topic.subtopics && topic.subtopics.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Subtopics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topic.subtopics.map(subtopic => (
              <div key={subtopic.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{subtopic.name}</h3>
                <p className="text-gray-600 mt-2">{subtopic.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
