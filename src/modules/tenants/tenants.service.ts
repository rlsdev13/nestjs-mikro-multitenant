import { Injectable } from '@nestjs/common';
import { InjectRepository, MikroOrmModule } from '@mikro-orm/nestjs';
import { Tenant } from './../../database/models/public/tenant.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';
import { getTenantConnection } from '../tenancy/tenancy.util';
// import { Migration20220106200228 } from '../../database/migrations/Migration20220106200228';


@Injectable()
export class TenantsService {

    constructor( 
        @InjectRepository(Tenant) private readonly tenantRepository : EntityRepository<Tenant> ,
        private readonly em : EntityManager,
        private readonly or : MikroORM
    ){}

    getConnection(){
        // const connection : Connection = this.em.getConnection();
        // console.log(connection);
        getTenantConnection('tenant_id', this.em );
        return "ok";        
    }

    async createEntity(){
        // await this.em.execute('CREATE SCHEMA IF NOT EXISTS schemaPrueba');

        const schemaGen = await this.or.getSchemaGenerator();

        const newSchema = await schemaGen.createSchema({ schema : 'empresa' });

        console.log(newSchema);

        // const migrator = await this.or.getMigrator();
        // console.log(migrator);
        // const migracion = await migrator.createMigration(); 
        // const resp = await migrator.up('20220106200228');
        
        // console.log(resp);
        // await this.tenantRepository.createQueryBuilder().insert({ name : 'schemaPrueba'}).withSchema('schemaPrueba');
        return ;
    }

}
