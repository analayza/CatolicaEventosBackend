import * as yup from 'yup';

const createEventSchema = yup.object().shape({
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
    start_date: yup
        .date()
        .typeError('Data inválida')
        .required('Campo obrigatório'),
    end_date: yup
        .date()
        .typeError('Data inválida')
        .required('Campo obrigatório'),
    location: yup
        .string()
        .trim()
        .min(3, 'O local deve ter no mínimo 3 caracteres')
        .required('Campo obrigatório'),
    image_url: yup
        .string()
        .url('URL da imagem inválida')
        .required('Campo obrigatório'),
    certificate_background_url: yup
        .string()
        .url('URL do certificado inválida')
        .required('Campo obrigatório'),
    sponsor_pitch: yup
        .string()
        .max(500, 'A descrição deve ter no máximo 500 caracteres')
        .required('Campo obrigatório'),
})


const updateEventSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    description: yup
        .string()
        .trim()
        .max(500, 'A descrição deve ter no máximo 500 caracteres'),
    start_date: yup
        .date()
        .typeError('Data inválida'),
    end_date: yup
        .date()
        .typeError('Data inválida'),
    location: yup
        .string()
        .trim()
        .min(3, 'O local deve ter no mínimo 3 caracteres'),
    image_url: yup
        .string()
        .url('URL da imagem inválida'),
    certificate_background_url: yup
        .string()
        .url('URL do certificado inválida'),
    sponsor_pitch: yup
        .string()
        .max(500, 'A descrição deve ter no máximo 500 caracteres')
})

export {updateEventSchema, createEventSchema};