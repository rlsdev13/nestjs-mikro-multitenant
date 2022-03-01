import { Customer } from './customer.entity';
import { MikroORM, wrap } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Company } from './company.entity';

describe('Test2776Service', () => {
  
  let orm  : MikroORM;

  beforeAll( async () => {
    orm = await MikroORM.init({
      entities : [ Company, Customer ],
      dbName : 'mikro_orm_test_gh_2776',
      type : 'postgresql',
      user : 'postgres',
      password : '13051997ec',
      allowGlobalContext : true
    })

    await orm.getSchemaGenerator().refreshDatabase();
    await orm.getSchemaGenerator().updateSchema({ schema : 's1'});
    await orm.em.nativeDelete(Customer,{},{ schema : 's1' });
  });

  afterAll( () => orm.close(true) );

  test('wildcard entities', async () => {
    const c = new Customer;
    c.name = 'e';
    c.company = new Company();
    c.company.name = 'c';
    wrap(c).setSchema('s1');
    wrap(c.company).setSchema('s1');
    await orm.em.fork().persistAndFlush(c);
    const res = await orm.em.getRepository(Customer).findAll({ populate : true, schema : 's1' });
    expect(res).toHaveLength(1);
    expect(wrap(res[0].company).isInitialized()).toBe(true);
    expect( res[0].name ).toBe('e');
    expect( res[0].company.name).toBe('c');
  })

});