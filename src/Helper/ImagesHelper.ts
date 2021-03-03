export default class ImagesHelper {
    getLocalUrl(filename: string): string {
        return `http://localhost:3333/images/${filename}`;
    }
}