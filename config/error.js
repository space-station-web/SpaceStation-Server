
// config/error.js
export class BaseError extends Error {
    constructor(data){
        super(data);
        this.data = data;
    }
}