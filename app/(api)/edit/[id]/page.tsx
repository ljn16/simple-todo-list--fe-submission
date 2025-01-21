'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TaskForm from '@/app/components/taskForm';

export default function EditTaskPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string }; // or useParams() with destructuring
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [loading, setLoading] = useState(true);
    const buttonText = 'Save';

    const fetchTask = async () => {
        try {
            const res = await fetch('http://localhost:4000/tasks');
            const data = await res.json();
            interface Task {
            id: number;
            title: string;
            color: string;
            }

            const task = data.find((t: Task) => t.id === Number(id));
            if (task) {
            setTitle(task.title);
            setColor(task.color);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, color })
            });

            if (res.ok) {
                router.push('/');
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className='md:max-w-[50vw] mx-auto p-4'>Loading task...</div>;

    return (
        <TaskForm 
            title={title}
            setTitleAction={setTitle}
            color={color}
            setColorAction={setColor}
            handleSubmitAction={handleSubmit} 
            buttonText={buttonText}
        />
    );
}