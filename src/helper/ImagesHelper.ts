export default class ImagesHelper {
    // Create a local URL for uploaded images when it's on development environment
    getLocalUrl(filename: string): string {
        const env = process.env;

        return `${env.APP_URL}/images/${filename}`;
    }
}