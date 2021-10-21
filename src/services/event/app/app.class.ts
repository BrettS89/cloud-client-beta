import { Application } from '@feathersjs/feathers';
import { NginxConfFile } from 'nginx-conf';

export class App {
  constructor(private app: Application) {}

  async create(data: Record<string, any>) {
    const filename = `${__dirname}/../../../nginx.conf`;

    //@ts-ignore
    NginxConfFile.create(filename, function (err: Error, conf: any) {
      if (err || !conf) {
          console.log(err);
          return;
      }

      conf.on('flushed', () => {
        console.log('FLUSHED');
      });

      const idx = conf.nginx.http?.[0].server?.[0].location.length;

      conf.nginx.http?.[0].server?.[0]._add('location', data.path);

      if (data.type === 'server') {
        conf.nginx.http?.[0].server?.[0].location?.[idx]._add('rewrite', data.path + '/(.*) /$1 break');
        conf.nginx.http?.[0].server?.[0].location?.[idx]._add('proxy_pass', 'http://localhost:' + data.port);
      } else if (data.type ==='static') {
        conf.nginx.http?.[0].server?.[0].location?.[idx]._add('alias', `/home/pi/apps/${data._id}/build/`);
        conf.nginx.http?.[0].server?.[0].location?.[idx]._add('index', 'index.html');
      }

      conf.flush();
    });

    return {};
  }
}
