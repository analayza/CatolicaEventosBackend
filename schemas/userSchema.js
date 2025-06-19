import * as yup from 'yup';

const createUserSchema = yup.object().shape({
    name: yup.string().trim().min(3, 'O nome deve ter no mínimo 3 caracteres').required('Campo obrigatório'),
    email: yup.string().trim().email('E-mail inválido').required('Campo obrigatório'),
    password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Campo obrigatório'),
});


const updateUserSchema = yup.object().shape({
    name: yup.string().trim().min(3, 'O nome deve ter no mínimo 3 caracteres').notRequired(),
    email: yup.string().trim().email('E-mail inválido').notRequired(),
    photo_url: yup.string().url('URL da foto inválida').notRequired(),
    password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').notRequired(),
});

export {updateUserSchema, createUserSchema};