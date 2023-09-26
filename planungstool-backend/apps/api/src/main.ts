import { ApiModule } from './api.module';
import { bootstrap } from '@panter/nestjs-utils';

const port: number = +(process.env.PORT || 4000);
console.log(`Starting app on port ${port}`);
bootstrap({ entryModule: ApiModule }).then((app: any) => app.listen(port));
