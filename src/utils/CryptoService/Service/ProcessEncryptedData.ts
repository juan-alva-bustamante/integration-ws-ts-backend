import { CryptoService } from "./CryptoService";

enum ACTION {
    ENCRYPT = "encriptar",
    DECRYPT = "desencriptar"
}

export class ProcessEncryptedData {
    private cryptoService: CryptoService;
    private action: ACTION;

    constructor(environment?: string) {
        this.action = ACTION.ENCRYPT;
        this.cryptoService = new CryptoService(environment ?? "dev");
    }

    private encryptObject(objectData: any) {
        const objectToArray = Object.keys(objectData);
        let objectToEncrypt: any = {};
        objectToArray.map((key) => {
            objectToEncrypt[key] = this.encryptDataByType(objectData[key]);
        });
        return objectToEncrypt;
    }

    private encryptArray(arrayObject: any) {
        let objectToEncrypt: any[] = [];
        arrayObject.map((data: any) => {
            objectToEncrypt.push(this.encryptDataByType(data));
        });
        return objectToEncrypt;
    }

    private encryptDataByType(data: any) {
        const dataType = (typeof data);
        switch (dataType) {
            case "string" || "number" || "boolean" || "bigint":
                if (this.action === ACTION.ENCRYPT) {
                    return this.cryptoService.encrypt(data);
                } else {
                    return this.cryptoService.decrypt(data);
                }

            case "undefined" || "symbol" || "function":
                return null;

            case "object":
                const isArray = Array.isArray(data);
                if (isArray) {
                    return this.encryptArray(data);
                } else {
                    return this.encryptObject(data);
                }
        }
    }

    public encryptData(dataToEncrypt: any): any {
        this.action = ACTION.ENCRYPT;
        return this.encryptDataByType(dataToEncrypt);
    }

    public decryptData(dataToDecrypt: any): any {
        this.action = ACTION.DECRYPT;
        return this.encryptDataByType(dataToDecrypt);
    }
}