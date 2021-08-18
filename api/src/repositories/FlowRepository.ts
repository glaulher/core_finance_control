import { EntityRepository, Repository } from 'typeorm';
import { Flow } from '../models/Flow';

@EntityRepository(Flow)
class FlowRepository extends Repository<Flow> {}

export { FlowRepository };

/*
 * Responsabilidade de acessar o banco de dados,
 * não é da responsabilidade do controller,
 * repositório acessa banco de dados.
 */

/*
 * alt + shfit + o organiza o código não utilizado
 */
