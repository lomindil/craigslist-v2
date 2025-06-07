import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function PostForm({ topicId }) {
  const { register, handleSubmit, reset } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8080/posts', {
        ...data,
        topicId: parseInt(topicId)
      })
      reset()
      router.reload() // Refresh to show the new post
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          {...register('title', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          rows={4}
          {...register('content', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Post
      </button>
    </form>
  )
}
