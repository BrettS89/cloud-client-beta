// Initializes the `event/deploy` service on path `/event/deploy`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Deploy } from './deploy.class';
import hooks from './deploy.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'event/deploy': Deploy & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/event/deploy', new Deploy(app));

  // Get our initialized service so that we can register hooks
  const service = app.service('event/deploy');

  service.hooks(hooks);
}
