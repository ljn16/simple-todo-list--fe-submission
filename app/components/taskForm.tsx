import { useRouter } from 'next/navigation';

import ColorPicker from './colorPicker';

interface TaskFormProps {
    title: string;
    setTitleAction: (title: string) => void; 
    color: string;
    setColorAction: (color: string) => void;
    handleSubmitAction: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    buttonText: string;
}

export default function TaskForm({
    title,
    setTitleAction,
    color,
    setColorAction,
    handleSubmitAction,
    buttonText
}: TaskFormProps) {
    const router = useRouter();

    return (
        <div className='md:max-w-[50vw] mx-auto p-4'>
            <button onClick={() => router.back()} className='mb-8 font-extrabold'>
                ←
            </button>

            <form onSubmit={handleSubmitAction} className='space-y-4'>
                <div>
                    <label className='block font-semibold mb-1 text-blue-400'>Title</label>
                    <input className='rounded p-2 w-full bg-grayCard'
                        type='text'
                        value={title}
                        onChange={(e) => setTitleAction(e.target.value)}
                        placeholder={title ? '' : 'Enter task title'}
                    />
                </div>
            </form>
            <ColorPicker color={color} setColor={setColorAction}/>
            <button className='bg-blue-400 py-2 px-4 mt-4 rounded cursor-pointer w-full' 
                onClick={handleSubmitAction}>
                {buttonText} {buttonText === 'Add Task' ? '➕' : '✔'}
            </button>
        </div>
    );
}
