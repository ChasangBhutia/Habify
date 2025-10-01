import React from 'react'
import TaskCard from '../../../components/TaskCard'
import Masonry from 'react-masonry-css'
import { useTaskContext } from '../../../context/TaskContext'
import TaskSortMenu from './TaskSortMenu'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
}

const TaskManager = () => {

    const { tasks, collabTasks } = useTaskContext();

    return (
        <div className='h-full overflow-y-auto relative z-2'>
            <TaskSortMenu />
            <div className='p-2'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto"
                    columnClassName="bg-transparent px-2"
                >
                    {tasks.map(task => (
                        <TaskCard key={task._id} id={task._id} title={task.title} priority={task.priority} type={task.type} collaborators={task.collaborators} owner={task.owner} description={task.description} content="dfs" />
                    ))}
                    {collabTasks.map(task => (
                        <TaskCard key={task._id} id={task._id} title={task.title} priority={task.priority} type={task.type} collaborators={task.collaborators} owner={task.owner} description={task.description} content="dfs" />
                    ))}

                </Masonry>
            </div>
        </div>
    )
}



export default TaskManager