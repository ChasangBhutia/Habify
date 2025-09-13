import React, { useState } from 'react'
import TaskArea from '../../../components/TaskArea'
import ChatBox from '../../../components/ChatBox'
import Collaborators from '../../../components/Collaborators'
import CreateSubTaskForm from '../../../components/CreateSubTaskForm'
import SearchUserForm from '../../../components/SearchUserForm'

const TaskWorkspace = ({task}) => {

  
  const [isSubTaskFromOpen, setIsSubTaskFromOpen] = useState(false);
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

  return (
    <div className='flex gap-2 h-full'>
      <div className='w-2/3'>
        <TaskArea task={task} setIsOpen={setIsSubTaskFromOpen}/>
      </div>
      <div className='w-1/3 flex flex-col gap-2'>
        <Collaborators collaborators={task.collaborators} setIsOpen={setIsSearchFormOpen}/>
        <ChatBox />
      </div>
      <CreateSubTaskForm task={task} setIsOpen={setIsSubTaskFromOpen} isOpen={isSubTaskFromOpen}/>
      <SearchUserForm taskId={task._id} isOpen={isSearchFormOpen} setIsOpen={setIsSearchFormOpen}/>
      
    </div>
  )
}

export default TaskWorkspace