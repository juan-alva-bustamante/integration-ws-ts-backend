import { enc, AES, mode, pad } from 'crypto-js';
import { keys, ENV } from '../keys';

export class CryptoService {

  // The secret token value to use for encrypt
  private readonly secretkey: string = "";

  private static getKeyByEnv(env: ENV): string {
    try {
      return atob(keys[env]) as string;
    } catch (err) {
      return "";
    }
  }

  constructor(key?: ENV | any) {
    if (!(key === ENV.dev || key === ENV.qa || key === ENV.prod)) {
      console.error("❌ Error al crear las llaves, el ambiente es incorrecto.", key);
      return this;
    }
    this.secretkey = CryptoService.getKeyByEnv(key);
    return this;
  }

  /**
   * Gets the encrypt value of a plain text
   * @param plainText the text to encrypt
   */
  public encrypt(plainText: string): string {
    const encrypted = AES.encrypt(
      plainText,
      this.secretkey
    );
    return encrypted.toString();
  }

  /**
   * Gets the text decrypted value
   * @param encryptedText the text decrypted
   */
  public decrypt(encryptedText: string): string {
    const decrypt = AES.decrypt(
      encryptedText,
      this.secretkey
    );
    return decrypt.toString(enc.Utf8);
  }
}
