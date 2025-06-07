import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function TopicList() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/topics')
        setTopics(response.data)
      } catch (error) {
        console.error('Error fetching topics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Main Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topics.map(topic => (
          <div key={topic.id} className="bg-white p-4 rounded-lg shadow">
            <Link href={`/topics/${topic.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {/* <a className="text-xl font-semibold text-blue-600 hover:underline">{topic.name}</a> */}
              {topic.name}
            </Link>
            <p className="text-gray-600 mt-2">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
