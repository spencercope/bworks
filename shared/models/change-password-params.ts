export class ChangePasswordParams {
    current: string;
    newPassword: string;

    constructor(current: string, newPassword: string) {
        this.current = current;
        this.newPassword = newPassword;
    }
}
