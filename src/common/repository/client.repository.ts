import { Client } from './../../entities/client.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client>{
    findByName(name: string, lastName?: string) {
        if(name && lastName) {
            return this.findOne({name, lastName});
        }else {
            return this.findOne({name});
        }
    }
}