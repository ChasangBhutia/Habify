import React, { useState } from 'react'
import TaskArea from '../../../components/TaskArea'
import ChatBox from '../../../components/ChatBox'
import Collaborators from '../../../components/Collaborators'
import GenericFormModel from '../../../components/GenericFormModel'
import SearchUserForm from '../../../components/SearchUserForm'
import { useTaskContext } from '../../../context/TaskContext'

const TaskWorkspace = ({ task }) => {

  const [isSubTaskFromOpen, setIsSubTaskFromOpen] = useState(false);
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);
  const {createNewSubTask} = useTaskContext();

  return (
    <div className='flex gap-2 h-full'>
      <div className='w-2/3'>
        <TaskArea task={task} setIsOpen={setIsSubTaskFromOpen} setIsSearchFormOpen={setIsSearchFormOpen}/>
      </div>
      {task.type === 'Group' ?
        <div className='w-1/3 flex flex-col gap-2'>
          <Collaborators collaborators={task.collaborators} setIsOpen={setIsSearchFormOpen} />
          <ChatBox />
        </div>
        : <div className='w-1/3 h-full bg-white rounded flex justify-center items-center poppins'>
          <h1>This feature will come soon</h1>
        </div>
      }
      <GenericFormModel
        isOpen={isSubTaskFromOpen}
        setIsOpen={setIsSubTaskFromOpen}
        title="Create New Sub Task"
        submitText="Create Sub Task"
        fields={[
          { name: 'title', placeholder: 'Enter subtask title' },
          {
            name: 'userId',
            type: 'select',
            placeholder: 'Select User',
            options: task.collaborators?.length > 0
              ? task.collaborators.map(c => ({ value: c._id, label: c.fullname }))
              : [{ value: '', label: 'No collaborators', disabled: true }]
          }
        ]}
        onSubmit={(data) => createNewSubTask(data, task._id)}
      />

      <SearchUserForm taskId={task._id} isOpen={isSearchFormOpen} setIsOpen={setIsSearchFormOpen} />

    </div>
  )
}

export default TaskWorkspace