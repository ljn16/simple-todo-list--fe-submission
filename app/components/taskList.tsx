'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clipboard from '../images/clipboard.svg';

type Task = {
    id: number;
    title: string;
    color: string;
    completed: boolean;
};

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:4000/tasks');
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleToggleCompleted = async (task: Task) => {
        try {
            await fetch(`http://localhost:4000/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: task.title,
                    color: task.color,
                    completed: !task.completed
                })
            });
            fetchTasks(); //? Refresh data
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' });
            fetchTasks(); 
        } catch (error) {
            console.error(error);
        }
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;

    return (
    <>
        <div className='task-overviews: flex justify-between mb-4'>
            <span>
                <span className='text-blue-400 font-semibold'>Tasks </span>
                <span className='bg-grayCard rounded-lg px-2'>{totalTasks}</span>
            </span>
            <span>
                <span className='text-purple-800 font-semibold'>Completed </span>
                <span className='bg-grayCard rounded-lg px-2'>{completedTasks} of {totalTasks}</span>
            </span>
        </div>

        <div className='task-cards: space-y-2'>
            {tasks.map((task) => (
            <div className='flex items-center justify-between p-4 rounded shadow bg-grayCard border-l-4' style={{ borderColor: task.color }}
                key={task.id}
            >
                <div className='flex items-center space-x-2'>
                    <input
                        type='checkbox'
                        checked={task.completed}
                        onChange={() => handleToggleCompleted(task)}
                    />
                    <Link href={`/edit/${task.id}`} className='font-semibold hover:underline'>
                        {task.title}
                    </Link>
                </div>
                <button className='bg-opacity-5 p-1 rounded-sm' onClick={() => handleDelete(task.id)}>
                    &#128465;
                </button>
            </div>
            ))}
        </div>

        {/* //? if no tasks in db: */}
        {tasks.length === 0 && (
            <div className='flex flex-col items-center text-center opacity-50 mt-4'>
                <Image src={clipboard} width={50} height={50} alt='No tasks icon' />
                <p className='font-bold m-4'>You don&apos;t have any tasks registered yet!</p>
                <p className='opacity-80'>Create tasks and register your to-do items</p>
            </div>
        )}
    </>
    );
}