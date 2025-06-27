import * as yup from 'yup';

const createSponsorSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 caracteres')
        .required('Campo Obrigatório'),

    website: yup
        .string()
        .trim()
        .min(3, 'O site ou rede social deve ter no mínimo 3 caracteres')
        .required('Campo Obrigatório'),

    sponsorship_value: yup
        .number()
        .typeError('O valor deve ser um número')
        .test(
            'min-sponsorship-value',
            function (value) {
                const minValue = this.options.context?.minimumSponsorshipValue;
                return value > minValue || this.createError({ message: `O valor do patrocínio deve ser maior que o mínimo do evento (${minValue})` });
            }
        )
        .required('O valor é obrigatório'),

    email: yup
        .string()
        .trim()
        .email('E-mail inválido')
        .required('Campo obrigatório'),

    phone: yup
        .string()
        .required('Telefone é obrigatório')
        .matches(
            /^(\+?\d{1,3})? ?(\(?\d{2}\)? ?)?(\d{4,5})-?\d{4}$/,
            'Telefone inválido. Formato esperado: (99) 99999-9999 ou +55 (99) 99999-9999'
        ),

    description: yup
        .string()
        .trim()
        .max(500, 'A descrição deve ter no máximo 500 caracteres'),

    logo_url: yup
        .string()
        .url('URL da logo inválida'),

    cnpj: yup
        .string()
        .notRequired()
        .nullable()
        .matches(
            /^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}|\d{14})$/,
            'CNPJ inválido. Formato esperado: 00.000.000/0000-00 ou 14 dígitos numéricos'
        )
        .nullable(true)
})

export { createSponsorSchema };

