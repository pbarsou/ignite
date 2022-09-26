import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationService } from "./CreateSpecificationService";

const createSpecificationsRepository = new SpecificationsRepository();

const createSpecificationService = new CreateSpecificationService(createSpecificationsRepository);

const createSpecificationController = new CreateSpecificationController(createSpecificationService);

export { createSpecificationController };