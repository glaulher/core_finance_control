import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };

/*
 * Responsabilidade de acessar o banco de dados,
 * não é da responsabilidade do controller,
 * repositório acessa banco de dados.
 */

/*
 * alt + shfit + o organiza o código não utilizado
 */
