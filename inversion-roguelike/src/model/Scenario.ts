import { Company } from "./Company";
import { Player } from "./Player";

export class Scenario {
    player: Player;
    companies: Company[];

    constructor(player: Player) {
        this.player = player;
        this.companies = [];
    }
}