import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Transactional } from '@panter/nestjs-utils';
import { SearchRequestInterest } from './search-request-interest.entity';
import { AcceptSearchRequestInterestInput } from './inputs/accept-search-request-interest.input';
import { UnableToAcceptSearchRequestInterestException } from './unable-to-accept-search-request-interest.exception';
import { AssignedBuildingComponent } from './assigned-building-component.entity';
import { BuildingComponentService } from '../building-component/building-component.service';

@Injectable()
export class SearchRequestInterestService {
  private repository: EntityRepository<SearchRequestInterest>;

  constructor(
    private readonly em: EntityManager,
    private readonly buildingComponentService: BuildingComponentService,
  ) {
    this.repository = em.getRepository(SearchRequestInterest);
  }

  @Transactional()
  async rejectInterest(
    interestId: string,
    rejectionReason?: string,
  ): Promise<SearchRequestInterest> {
    const interest = await this.repository.findOneOrFail(interestId);
    interest.reject(rejectionReason);
    return interest;
  }

  @Transactional()
  async acceptSearchRequestInterest(input: AcceptSearchRequestInterestInput) {
    const errors: string[] = [];
    const searchRequestInterest = await this.repository.findOneOrFail(
      {
        id: input.interestId,
      },
      {
        populate: [
          'buildingComponent.dimensions',
          'buildingComponent.assets',
          'buildingComponent.mainImage',
          'buildingComponent.storageLocation',
          'buildingComponent.category',
          'buildingComponent.ebkphCategory',
        ],
      },
    );

    const toBeAssigned = input.buildingComponent;
    const buildingComponent = searchRequestInterest.buildingComponent;

    if (buildingComponent.id !== toBeAssigned.buildingComponentId) {
      errors.push(
        `BuildingComponent ${toBeAssigned.buildingComponentId} not found in SearchRequestInterest.`,
      );
      return;
    }

    const requestedQuantity =
      toBeAssigned.amount + (toBeAssigned.amountReserved || 0);
    if (buildingComponent.quantity === undefined) {
      errors.push(
        `Insufficient quantity of building component '${buildingComponent}. Requested: ${requestedQuantity}, Available: 0'`,
      );
      return;
    }
    if (
      buildingComponent.quantity &&
      buildingComponent?.quantity < requestedQuantity
    ) {
      errors.push(
        `Insufficient quantity of building component '${buildingComponent}'. Requested: ${requestedQuantity}, Available: ${buildingComponent.quantity}`,
      );
      return;
    }
    const assignedBuildingComponent =
      requestedQuantity === buildingComponent.quantity
        ? buildingComponent
        : await this.buildingComponentService.splitBuildingComponent(
            buildingComponent,
            requestedQuantity,
          );
    this.em.persist(assignedBuildingComponent);

    this.em.create(
      AssignedBuildingComponent,
      new AssignedBuildingComponent(
        searchRequestInterest.searchRequest,
        assignedBuildingComponent,
        toBeAssigned.amount,
        toBeAssigned.amountReserved,
      ),
    );

    if (errors.length) {
      throw new UnableToAcceptSearchRequestInterestException(errors);
    }
    searchRequestInterest.accept();
    return searchRequestInterest;
  }
}
