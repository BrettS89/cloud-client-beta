import { Application } from '../declarations';
import eventApp from './event/app/app.service';
import eventDeploy from './event/deploy/deploy.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(eventApp);
  app.configure(eventDeploy);
}
