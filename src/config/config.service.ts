import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService {
  constructor(public env: { [k: string]: string | undefined } = process.env) {}

  protected get(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.get(k, true));
    return this;
  }

  public getPort() {
    return this.get('PORT', true);
  }

  public isProduction() {
    const mode = this.get('NODE_ENV', true);
    return mode === 'production';
  }

  public isTesting() {
    const mode = this.get('NODE_ENV', true);
    return mode === 'test';
  }
}
