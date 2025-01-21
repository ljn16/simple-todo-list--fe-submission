import Link from 'next/link';

export default function CreateTask() {
  return (
    <Link href='/create' className='inline-block w-full text-center font-bold bg-blue-400 px-4 py-2 rounded mb-12'>
        Create Task &#x2295;
    </Link>
  );
}