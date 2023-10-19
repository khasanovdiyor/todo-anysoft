import { KnexOptions } from 'src/knex';
import { ConfigService } from './config.service';

class KnexConfig extends ConfigService {
  getKnexOptions(): KnexOptions {
    console.log('istesting', this.isTesting());
    return {
      client: 'pg',
      debug: true,
      connection: {
        host: this.get('DB_HOST'),
        user: this.get('DB_USER'),
        password: this.get('DB_PASSWORD'),
        database: this.isTesting()
          ? this.get('DB_NAME_TEST')
          : this.get('DB_NAME'),
        port: +this.get('DB_PORT'),
      },
      migrations: {
        directory: 'src/db/migrations',
        extension: 'ts',
      },
    };
  }
}

export default new KnexConfig().ensureValues([
  //DATABASE vars
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'DB_PORT',
]);
