export class Exception extends Error {
    public status: number;
    public message: string;
    public data?: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        Object.setPrototypeOf(this, Exception);
        this.status = status;
        this.message = message
        this.data = data;
    }

}
