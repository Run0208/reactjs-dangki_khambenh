export const adminMenu = [
    
    { // Quản lý người dùng
        name: 'menu.admin.manage', 
        menus: [
            {// Dashboard
                name: 'menu.admin.dashboard', link: '/system/dashboard'
            },
            // {// Quản lý Users CRUD
            //     name: 'menu.admin.crud', link: '/system/user-manage'
            // },
            {// Quản lý Users
                name: 'menu.admin.manage-user', link: '/system/manage-user'
            },
            {// Quản lý lên lịch khám bệnh của bác sĩ
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'

            },
            // { // Quản lý kế hoạch khám bệnh của bác sĩ
            //      name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            // },
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
            
        ]
    },

];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user', 
        menus: [
            { // Quản lý kế hoạch khám bệnh của bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
            { // Quản lý bệnh nhân khám bệnh của bác sĩ
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            }
        ]
    }
];