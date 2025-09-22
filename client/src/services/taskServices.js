import api from "./api";

export const createTask = (taskData) => {
    return api.post('/tasks/', taskData)
}

export const getAllTasks = () => {
    return api.get('/tasks/');
}

export const getTask = (taskId) => {
    return api.get(`/tasks/${taskId}`);
}

export const addCollaborators = (userId, taskId) => {
    return api.patch(`tasks/${taskId}`, {userId});
}

export const createSubTask = (subTaskData, taskId) => {
    return api.post(`/tasks/${taskId}/sub-task`, subTaskData);
}

export const markSubTask = (subTaskId, progress)=>{
    return api.patch(`/tasks/sub-task/${subTaskId}/toogle`, {progress})
}