import Link from 'next/link'
import TopicList from '../components/Topics/TopicLists'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Craigslist Improved</h1>
      <TopicList />
    </div>
  )
}
