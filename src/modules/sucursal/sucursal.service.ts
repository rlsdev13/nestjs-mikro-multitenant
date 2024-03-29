import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Sucursal } from '../../database/models/global/sucursal/sucursal.entity';

@Injectable()
export class SucursalService {
    
    constructor(
        @InjectRepository(Sucursal) private readonly sucursalRepo : EntityRepository<Sucursal>,
        private readonly em : EntityManager
    ){}

    async getSucursal( schema : string ): Promise<Sucursal[]>{
        // return await this.sucursalRepo.findAll({ populate : true, schema });
        return await this.sucursalRepo.find({},{ schema, fields : ['nombreSucursal','idOrganizacion','idClienteAsignado' ] });
    }

    /**
     * TODO - 
     * 1.obtener los schemas a los que esta relacionado el schema sucursal (empresa,public) 
     *      el schema se puede obtener directamente desde los middlewares
     * 2.inyectar los schemas en el script
     */
    async getSucursalQueryBuilder( schema : string ){
        return await this.em.execute(`SELECT * FROM ${schema}.sucursal`);
    }
}
