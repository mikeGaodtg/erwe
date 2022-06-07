export const asyncRouterMap = [
    {
        path: '/home',
        name: 'Home',
        meta: {title:"HomePage", role: ['admin','teacher','manager'],icon:"team"},
    },
    {
        path: '/personal',
        name: 'Personal',
        meta: {title:"Personal Center", role: ['admin','teacher','manager'],icon:"team"},
    },
    {
        path: '/teacher',
        name: 'Teacher',
        meta: {title:"Staff Management", role: ['admin'],icon:"team"},
    },
    {
        path: '/admissions',
        name: 'Admissions',
        meta: {title:"Admissions",role: ['admin','manager'],icon:"customer-service" },
        children:[
            {
                path: '/admissions/intentional',
                name: 'Intentional',
                meta: {title:"Intentional",role: ['admin','manager'], icon:"smile",bread:['招生管理','意向学员管理'],keepAlive:true},              
            },
            {
                path: '/admissions/solicitation',
                name: 'Solicitation',
                meta: {title:"Solicitation",role: ['admin'],icon:"profile",bread:['招生管理','邀约查询'] },
                
            }
        ]
    },
    {
        path: '/student',
        name: 'Student',
        meta: {title:"Student", role: ['admin','teacher','manager'],icon:"solution"  },
        children:[
            {
                path: '/student/info',
                name: 'Info',
                meta: {title:"学生信息",role: ['admin','teacher','manager'],icon:"file-text",bread:['学生管理','学生信息']},
            },
            {
                path: '/student/exam',
                name: 'Exam',
                meta: {title:"Exam",role: ['admin','teacher'],icon:"form",bread:['学生管理','考试管理']},
            },
        ]
    },
    {
        path: '/class',
        name: 'Class',
        meta: {title:"Class",role: ['admin'],icon:"unordered-list" },
    },
    {
        path: '/administrative',
        name: 'Administrative',
        meta: {title:"Administrative",role: ['admin'],icon:"car" },
    },
    {
        path: '/finance',
        name: 'Finance',
        meta: {title:"Finance", role: ['admin'],icon:"account-book"},
    },
];