import { AbilityGroup } from "./AbilityGroup";
import { AbilityTrigger } from "./AbilityTrigger";
import { AbilityType } from "./AbilityType";
import { Company } from "./Company";
import { Scenario } from "./Scenario";

export class Player {
    name: string;
    abilityGroups: AbilityGroup[];
    money: number;

    constructor(name: string) {
        this.name = name;
        this.abilityGroups = [];
        this.money = 200;
    }

    getAbilities(abilityType: AbilityType, abilityTrigger: AbilityTrigger): AbilityGroup | null {
        const abilityGroup: AbilityGroup[] = this.abilityGroups.filter(abilityGroup => abilityGroup.find(abilityType, abilityTrigger));
        if (abilityGroup.length > 0) {
            return abilityGroup[0];
        }
        return null;
    }

    addAbility(abilitie: (scenario: Scenario, company?: Company) => void, abilityType: AbilityType, abilityTrigger: AbilityTrigger): void {
        const abilitieGroup = this.getAbilities(abilityType, abilityTrigger);
        if (abilitieGroup == null) {
            this.abilityGroups.push(new AbilityGroup(abilityType, abilityTrigger, abilitie));
        }
        else {
            abilitieGroup.add(abilitie);
        }
    }
}