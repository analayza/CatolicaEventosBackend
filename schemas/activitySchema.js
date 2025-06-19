import * as yup from 'yup';

const createActivitySchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 caracteres')
        .required('Campo obrigatório'),

    description: yup
        .string()
        .trim()
        .max(500, 'A descrição deve ter no máximo 500 caracteres')
        .required('Campo obrigatório'),

    speaker: yup
        .string()
        .trim()
        .min(4, 'O nome do palestrante deve ter no mínimo 4 caracteres')
        .required('Campo obrigatório'),

    date: yup
        .date()
        .typeError('Data inválida')
        .required('Campo obrigatório'),

    time: yup
        .string()
        .trim()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inválida (formato HH:MM)')
        .required('Campo obrigatório'),

    slots: yup
        .number()
        .integer('A quantidade de vagas deve ser um número inteiro')
        .positive('A quantidade de vagas Deve ser um número positivo')
        .required('Campo obrigatório'),

    workload: yup
        .number()
        .positive('A carga horaria deve ser um número positivo')
        .required('Campo obrigatório'),

    location: yup
        .string()
        .trim()
        .min(3, 'O local deve ter no mínimo 3 caracteres')
        .required('Campo obrigatório'),

    price: yup
        .number()
        .min(0, 'O valor não pode ser negativo')
        .required('Campo obrigatório'),
});


const updateActivitySchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),

    description: yup
        .string()
        .trim()
        .max(500, 'A descrição deve ter no máximo 500 caracteres'),

    speaker: yup
        .string()
        .trim()
        .min(4, 'O nome do palestrante deve ter no mínimo 4 caracteres'),

    date: yup
        .date()
        .typeError('Data inválida'),

    time: yup
        .string()
        .trim()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inválida (formato HH:MM)'),

    slots: yup
        .number()
        .integer('A quantidade de vagas deve ser um número inteiro')
        .positive('A quantidade de vagas Deve ser um número positivo'),

    workload: yup
        .number()
        .positive('A carga horaria deve ser um número positivo'),

    location: yup
        .string()
        .trim()
        .min(3, 'O local deve ter no mínimo 3 caracteres'),

    price: yup
        .number()
        .min(0, 'O valor não pode ser negativo')
});

export {createActivitySchema, updateActivitySchema};
