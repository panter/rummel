import { Contact } from './contact.entity';
import { ContactFindManyResolver, ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Contact] })],
  providers: [ContactResolver, ContactService, ContactFindManyResolver],
})
export class ContactModule {}
