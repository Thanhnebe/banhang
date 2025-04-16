import ToastMessage from "./ToastMessage";

class Validation {
    static validateEmail(email: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static validatePhone(phone: string): boolean {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }

    static validatePassword(password: string): boolean {
        const re = /^[a-zA-Z0-9]{6,}$/;
        return re.test(password);
    }

    static validateConfirmPassword(password: string, confirm_password: string): boolean {
        return password === confirm_password;
    }


}

export { Validation };

