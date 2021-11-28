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
    return axios.get(`/api/get/detail-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/create-schedule', data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctor = (doctorId) => {
    return axios.get(`/api/get-extra_infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
}

// ---------------- Email ----------------

const postVerifyEmail = (data) => {
    return axios.post('/api/verify-book-appointment', data);
}

// ---------------- Specialty ----------------

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
}

const getAllDetailSpecialtyById= (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const deleteSpecialtyService = (specialtyId) => {
    return axios.delete('/api/delete-specialty', { data: { id: specialtyId }});
}

const editSpecialtyService = (inputData) => {
    return axios.put('/api/edit-specialty', inputData);
}

// ---------------- Clinic ----------------

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getAllDetailClinicById= (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}

const deleteClinicService = (clinicId) => {
    return axios.delete('/api/delete-clinic', { data: { id: clinicId }});
}

const editClinicService = (inputData) => {
    return axios.put('/api/edit-clinic', inputData);
}

// --------------------------------

const getAllPatient = () => {
    return axios.get(`/api/get-all-patient`);
}

const getAllPatientForDoctor= (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy= (data) => {
    return axios.post('/api/send-remedy', data);
}

const postSendRemedyOnlineClinic= (data) => {
    return axios.post('/api/send-online-class-room', data);
}

const postSendBlockedNotification= (data) => {
    return axios.post('/api/send-blocked-notification', data);
}

export { 
    handleLoginApi, getAllUsers, 
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getDetailInforDoctor, 
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctor, getProfileDoctor,
    postBookAppointment, postVerifyEmail,
    createNewSpecialty, getAllSpecialty,
    getAllDetailSpecialtyById, createNewClinic,
    getAllClinic, getAllDetailClinicById,
    getAllPatientForDoctor, postSendRemedy,
    postSendRemedyOnlineClinic,
    deleteSpecialtyService,
    editSpecialtyService,
    deleteClinicService,
    editClinicService,
    postSendBlockedNotification,
    getAllPatient
};