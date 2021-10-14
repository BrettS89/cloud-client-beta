// Initializes the `event/app` service on path `/event/app`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { App } from './app.class';
import hooks from './app.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'event/app': App & ServiceAddons<any>;
  }
}

export default function (app: Application): void {

  // Initialize our service with any options it requires
  app.use('/event/app', new App(app));

  // Get our initialized service so that we can register hooks
  const service = app.service('event/app');

  service.hooks(hooks);
}
