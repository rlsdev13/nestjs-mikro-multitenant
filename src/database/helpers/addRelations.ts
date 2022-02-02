import { camelToSnakeCase } from '../helpers/utils';
;

/**
 * schemaPrimary = $empresa || $sucursal || $public
 * tablePrimary = Organizacion -> id || uuid
 * 
 * schemaForeign = $empresa || sucursal || public 
 * tableForeign = Cliente -> id_organizacion
 * 
 * 
 * podria enviarse separado (tenant_12546, organizacion, )
 * o todo junto (tenant123154.organizacion,)./
 * 
 * 
 * ALTER TABLE empresa2.cliente
 * ADD CONSTRAINT fk_public
 * FOREIGN KEY (id_organizacion)
 * REFERENCES public.organizacion(uuid);
 */

export const addRelations = ( schemaForeign : string, tableForeign : string, schemaPrimary : string, tablePrimary : string ) : string  => {
    
    const query = `ALTER TABLE ${ schemaForeign+'.'+camelToSnakeCase( tableForeign )}
    ADD CONSTRAINT fk${ schemaForeign+'.'+tableForeign+'_'+schemaPrimary+'.'+tablePrimary }
    FOREIGN KEY(id_${camelToSnakeCase( tablePrimary )})
    REFERENCES ${ tablePrimary }(uuid);`

    return query;
}
