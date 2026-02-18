import stadia from "../data/stadia.json" with { type: "json" };
import { Location } from './types';

export class Stadia {
    private static instance:Stadia|null = null;

    private locations:Map<string, Location>;

    private constructor() {
        this.locations = new Map<string, Location>();

        stadia.forEach(s => {
            const location:Location = {
                stadium: s.stadium,
                id: s.id,
                city: s.city,
                coords: [s.coords[0], s.coords[1]],
            };

            this.locations.set(s.id, location);
        });
    }
    
    public getStadium(id:string):Location {
        const stadium = this.locations.get(id);

        if (stadium)
            return stadium;
        else 
            return {
                coords: ["0", "0"], 
                id: id,
                city: 'NULL',
                stadium: 'NULL'
            };
    }

    public static getInstance():Stadia {
        if (!Stadia.instance) {
            Stadia.instance = new Stadia();
        }

        return Stadia.instance;
    }
}