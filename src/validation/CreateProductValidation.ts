import * as yup from 'yup';

interface DataInterface {
    title: string;
    value: number;
    category_id: number;
    images: Array<{
        name: string;
        size: number;
        key: string;
        url: string;
    }>
}

export default class CreateProductValidation {

    // Checks if the product data is valid
    async validate(data: DataInterface) {
        const productSchema = yup.object().shape({
            title: yup.string().required(),
            value: yup.number().required(),
            category_id: yup.number().required(),
            images: yup.array().of(
                yup.object().shape({
                    name: yup.string().required(),
                    size: yup.number().required(),
                    key: yup.string().required(),
                    url: yup.string().required(),
                })
            ).min(1),
        });

        // Validates the data. If it's missing something, throws error of type ValidationError
        return await productSchema.validate(data, {
            abortEarly: false
        });
    }
}