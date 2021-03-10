export default class ProductsNotFound {
    
    public readonly message: string;
    private readonly statusCode: number;

    constructor(message: string, statusCode = 404) {
        this.message = message;
        this.statusCode = statusCode;
    }
}