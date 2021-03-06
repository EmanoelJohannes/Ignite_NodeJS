import { getRepository, Repository } from "typeorm";
import { specificationsRoutes } from "../../../../../shared/infra/http/routes/specification.routes";
import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationRepository";


class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name
        });

        return specification;
    }
}

export {SpecificationRepository}