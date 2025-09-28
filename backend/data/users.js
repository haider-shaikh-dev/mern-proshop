import bcrypt from "bcryptjs";

const users = [
    {
        name:'Admin User',
        email:'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'Haider',
        email:'haider@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name:'Akhter',
        email:'akhter@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
];

export default users;