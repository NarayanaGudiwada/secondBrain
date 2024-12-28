export class SBError extends Error{

    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = 'SBError';
        this.code = code;
    }

}