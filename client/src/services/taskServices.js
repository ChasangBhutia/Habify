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
    return api.patch(`/tasks/${taskId}`, { userId });
}

export const createSubTask = (subTaskData, taskId) => {
    return api.post(`/tasks/${taskId}/sub-task`, subTaskData);
}

export const markSubTask = (subTaskId, progress) => {
    return api.patch(`/tasks/sub-task/${subTaskId}/toggle`, { progress })
}

//add comment
export const addComment = (subTaskId, comment) => {
    return api.post(`/tasks/${subTaskId}/comment`, { text: comment });
}

//upload files
export const addFile = (subTaskId, formData) =>{
    return api.post(`/tasks/${subTaskId}/file`, formData, {
        headers:{
            "Content-Type" : "multipart/form-data"
        }
    })
}