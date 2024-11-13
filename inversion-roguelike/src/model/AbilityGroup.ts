import { AbilityTrigger } from "./AbilityTrigger";
import { AbilityType } from "./AbilityType";
import { Company } from "./Company";
import { Scenario } from "./Scenario";

export class AbilityGroup {
    abilityType: AbilityType;
    abilityTrigger: AbilityTrigger;
    abilities: Array<(scenario: Scenario, company?: Company) => void>;

    constructor(abilityType: AbilityType, abilityTrigger: AbilityTrigger, abilitie: (scenario: Scenario, company?: Company) => void) {
        this.abilityType = abilityType;
        this.abilityTrigger = abilityTrigger;
        this.abilities = [abilitie]
    }

    find(abilityType: AbilityType, abilityTrigger: AbilityTrigger): boolean {
        return abilityType == this.abilityType && abilityTrigger == this.abilityTrigger;
    }

    add(ability: (scenario: Scenario, company?: Company) => void): void {
        this.abilities.push(ability);
    }
}