'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import TaskForm from '../../components/taskForm';

export default function CreateTaskPage() {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#2d2d2d');
    const buttonText = 'Add Task';

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            alert('Title is required!');
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, color })
            });

            if (res.ok) {
                router.push('/');
            } else {
                console.error('Failed to create task');
            }
        } catch (error) {
            console.error(error);
        }
    };


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
