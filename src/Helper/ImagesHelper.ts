export default class ImagesHelper {
    // Create a local URL for uploaded images when it's on development environment
    getLocalUrl(filename: string): string {
        return `http://localhost:3333/images/${filename}`;
    }
}