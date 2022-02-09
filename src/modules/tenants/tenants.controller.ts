import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {

    constructor(private readonly tenantService : TenantsService){}

    @Get()
    getConnection(){
        // return this.tenantService.getConnection();    
        // return this.tenantService.runMigrations();
        // return this.tenantService.makeRelations();
        return "hola"
    }

    @Get('/empresa')
    getTenantsEmpresa(){
        return this.tenantService.getTenantsEmpresa();
    }

    @Get('/sucursal/:idEmpresa')
    getTenantsSucursal(@Param('idEmpresa') idSchemaEmpresa : string ){
        return this.tenantService.getTenantsSucursal( idSchemaEmpresa );
    }

    @Get('/create')
    createTenant(){
        return this.tenantService.createEntity();
    }

    @Get('/create/base')
    createSchemaBase(){
        return this.tenantService.makeSchemaBase();
    }

    /**
     * @param nameSchema 
     * @returns 
     * 
     * TODO
     * Crear dto para creacion de schema
     */
    @Post('/create/empresa')
    createSchemaEmpresa(@Body('schema') nameSchema : string ){
        return this.tenantService.makeSchemaEmpresa(nameSchema);
    }

    /**
     * @param nameSchema 
     * @returns 
     * 
     * TODO
     * Crear dto para creacion de schema, pasar el idEmpresa de param a body
     */
    @Post('/create/sucursal/:idEmpresa')
    createSchemaSucursal(@Body('schema') nameSchema : string, @Param('idEmpresa') idEmpresa : string ){
        return this.tenantService.makeSchemaSucursal( nameSchema, idEmpresa );
    }
}
