import { createContext, useContext, useEffect, useState } from "react";
import { createSubTask, createTask, getTask, markSubTask, addCollaborators, addComment, addFile } from "../services/taskServices";
import { getAllTasks } from '../services/taskServices';
import { useAlertContext } from "./AlertContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const { success, setSuccess, error, setError, refresh, setRefresh } = useAlertContext();

    const [tasks, setTasks] = useState([]);
    const [collabTasks, setCollabTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                let response = await getAllTasks();
                if (response.data.success) {
                    setTasks(response.data.tasks);
                    setCollabTasks(response.data.collabTasks);
                }
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        }
        fetchTasks();
    }, [refresh])

    const createNewTask = async (taskData) => {
        try {
            let response = await createTask(taskData);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
            setRefresh(prev => prev + 1);

        } catch (err) {
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.log(err.message);
        }
    }

    const fetchTask = async (taskId) => {
        try {
            let response = await getTask(taskId);
            if (response.data.success) {
                setSelectedTask(response.data.task);
            } else {
                setSelectedTask(null);
            }
            setRefresh(prev => prev + 1);
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.log(err.message);
            setSelectedTask(null);
        }
    }

    const createNewSubTask = async (subTaskData, taskId) => {
        try {
            let response = await createSubTask(subTaskData, taskId);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
            fetchTask(taskId);
            setRefresh(prev => prev + 1);

        } catch (err) {
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.log(err.message);
        }
    }

    const changeSubTaskProgress = async (subTaskId, taskId, progress) => {
        try {
            let response = await markSubTask(subTaskId, progress);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
            setRefresh(prev => prev + 1)
            fetchTask(taskId);

        } catch (err) {
            if (err.response) {
                setError(err.response.data.error)
                setTimeout(() => {
                    setError(null);
                }, 3000)
            }
            console.log(err.message);
        }
    }

    const addCollabInTask = async (userId, taskId) => {
        try {
            let response = await addCollaborators(userId, taskId);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
                fetchTask(taskId);
            }
        } catch (err) {
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.error(`Error adding collaborators: ${err.message}`);
        }
    }

    const addNewComment = async (subTaskId, comment) => {
        try {
            let response = await addComment(subTaskId, comment);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
        } catch (err) {
            console.error(err.message);
            setError(err.response.data.error)
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.error(`Error adding collaborators: ${err.message}`);
        }
    }

    const uploadFile = async (subTaskId, formData) => {
        try {
            let response = await addFile(subTaskId, formData);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
        } catch (err) {
            console.error(err.message);
            setError(err.response.data.error);
            setTimeout(() => {
                setError(null);
            }, 3000)
        }
    }

    return (
        <TaskContext.Provider value={{ uploadFile, addNewComment, success, createNewSubTask, tasks, addCollabInTask, error, fetchTask, selectedTask, changeSubTaskProgress, createNewTask, collabTasks }}>
            {children}
        </TaskContext.Provider>
    )
};

export const useTaskContext = () => {
    return useContext(TaskContext)
}