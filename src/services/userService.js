import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, { 
        id: inputId 
    });
}

const createNewUserService = (data) => {
    
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId }});
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get/detail-doctor?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/create-schedule', data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctor = (doctorId) => {
    return axios.get(`/api/get-extra_infor-doctor?doctorId=${doctorId}`);
}

export { 
    handleLoginApi, 
    getAllUsers, 
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor, 
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctor,

    
};