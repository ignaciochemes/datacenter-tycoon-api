import * as bcrypt from 'bcrypt';

export default class UtilityFunctions {
    static async getEncryptData(data: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            data = await bcrypt.hashSync(data, salt);
            return data;
        } catch (e) {
            throw new Error('Bcrypt generate password error');
        }
    }

    static async getEncryptCompare(data: string, encryptData: string): Promise<boolean> {
        try {
            const dataValidation = bcrypt.compareSync(data, encryptData);
            if (!dataValidation) {
                return false;
            }
            return true;
        } catch (e) {
            throw new Error('Bcrypt compare error');
        }
    }

}