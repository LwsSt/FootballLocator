import stadia from "../data/stadia.json" with { type: "json" };
import { Location } from './types';

export class Stadia {
    private static instance:Stadia|null = null;

    private locations:Map<string, Location>;

    private constructor() {
        this.locations = new Map<string, Location>();

        stadia.forEach(s => {
            const location:Location = {
                name: s.name,
                coords: [s.coords[0], s.coords[1]],
                dataLink: s.shortLink,
            };

            this.locations.set(s.name, location);
        });
    }
    
    public getStadium(name:string):Location {
        const stadium = this.locations.get(name);

        if (stadium)
            return stadium;
        else 
            return {
                coords: [0, 0], 
                dataLink: '',
                name: 'NULL'
            };
    }

    public static getInstance():Stadia {
        if (!Stadia.instance) {
            Stadia.instance = new Stadia();
        }

        return Stadia.instance;
    }
}