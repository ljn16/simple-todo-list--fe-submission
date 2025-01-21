import Header from './components/header';
import TaskList from './components/taskList';
import CreateTask from './components/createTask';


export default function Home() {
  return (
    <>
      <Header/>

      <main className='md:max-w-[50vw] mx-auto p-4 -mt-9'>
        <CreateTask/>
        <TaskList/>
      </main>
    </>
  );
}