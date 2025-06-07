import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function TopicForm({ parentId }) {
  const { register, handleSubmit, reset } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8080/topics', {
        ...data,
        parentId: parentId || null
      })
      reset()
      router.reload() // Refresh to show the new subtopic
    } catch (error) {
      console.error('Error creating topic:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Topic
      </button>
    </form>
  )
}
