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
        .matches(/^data:image\/(png|jpeg|jpg);base64,/, 'Formato da imagem do evento inválido')
        .required('Campo obrigatório'),
    certificate_background_url: yup
        .string()
        .matches(/^data:image\/(png|jpeg|jpg);base64,/, 'Formato do certificado inválido')
        .required('Campo obrigatório'),
    sponsor_pitch: yup
        .string()
        .max(500, 'A descrição deve ter no máximo 500 caracteres')
        .required('Campo obrigatório'),
    minimum_sponsorship_value: yup
        .number()
        .transform((value, originalValue) => {
            return originalValue === '' ? NaN : Number(originalValue);
        })
        .min(0, "O valor do patrocinio deve ser maior que zero")
        .typeError("O valor mínimo do patrocínio deve ser um número")
        .required("O valor mínimo de patrocínio é obrigatório"),
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
        .matches(/^data:image\/(png|jpeg|jpg);base64,/, 'Formato da imagem do evento inválido'),
    certificate_background_url: yup
        .string()
        .matches(/^data:image\/(png|jpeg|jpg);base64,/, 'Formato do certificado inválido'),
    sponsor_pitch: yup
        .string()
        .max(500, 'A descrição deve ter no máximo 500 caracteres'),
    minimum_sponsorship_value: yup
        .number()
        .transform((value, originalValue) => {
            return originalValue === '' ? NaN : Number(originalValue);
        })
        .min(0, "O valor do patrocinio deve ser maior que zero")
        .typeError("O valor mínimo do patrocínio deve ser um número")
})

export { updateEventSchema, createEventSchema };