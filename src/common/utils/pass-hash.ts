import * as bcrypt from 'bcrypt';

export class PassHash {
  static readonly rounds = 10;

  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.rounds);
  }

  static async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
