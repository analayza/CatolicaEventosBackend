import * as yup from 'yup';

const cursosValidos = ['Ciências da Computação', 'Direito', 'Educação Física', 'Marketing', 'Filosofia'];


const createUserAdminSchema = yup.object().shape({
    name: yup.string().trim().min(3, 'O nome deve ter no mínimo 3 caracteres').required('Campo obrigatório'),
    email: yup.string().trim().email('E-mail inválido').required('Campo obrigatório'),
    course: yup.string().oneOf(cursosValidos, 'Curso inválido').required('Campo obrigatório'),
    password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Campo obrigatório'),
});

const updateUserAdminSchema = yup.object().shape({
    name: yup.string().trim().min(3, 'O nome deve ter no mínimo 3 caracteres').notRequired(),
    email: yup.string().trim().email('E-mail inválido').notRequired(),
    profile_picture: yup.string().matches(/^data:image\/(png|jpeg|jpg);base64,/, 'Formato da imagem de perfil inválida').notRequired(),
    password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').notRequired(),
});

export {updateUserAdminSchema, createUserAdminSchema};