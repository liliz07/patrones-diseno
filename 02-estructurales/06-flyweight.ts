import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
//Icono que vamos autilizar para mostratlo en un mapa
interface Location{
    display(coordenates: {x:number, y:number}): void;
}
//Flyweight
class LocationIcon implements Location{
    private type: string; //hospital, escuela, parque
    private iconImage: string; //Imagend el marcador

    constructor(type:string, iconImage: string){
        this.type = type;
        this.iconImage = iconImage;
    }

    display(coordenates: { x: number; y: number; }): void {
      console.log(
        `Coords: ${this.type} en ${coordenates.x}, ${coordenates.y} con ícono %c[${this.iconImage}]`,
        COLORS.green
      )
    }
}

//Fabrica de Flyweights
//Permite almacenar todas las instancias
//Reutilizar todos los locationIcons
class LocationFactory{
    private icons: Record<string, LocationIcon> = {};
//type: escuela, hospital, parque
    getLocationIcon(type: string):LocationIcon{
        if(!this.icons[type]){
            console.log(`%ccreando nueva imagen de ${type}`, COLORS.red)
            const iconImage = `imagen_de_${type}.png`
            this.icons[type] = new LocationIcon(type, iconImage);
        }
        return this.icons[type];
    }
}


//Marcador
class MapLocation{
    private coordinates: {x:number, y:number};
    private icon : LocationIcon;

    constructor(
        x:number,
        y:number,
        icon: LocationIcon,
    ){ 
        this.coordinates = {x,y};
        this.icon = icon;
    }

    //desplegamos la coordenadas del elemento
    display(){
        this.icon.display(this.coordinates);
    }
}

function main(){
    const factory = new LocationFactory(); //uso del patron

    const locations = [
        new MapLocation(10,20,factory.getLocationIcon('hospital')),
        new MapLocation(20,40,factory.getLocationIcon('hospital')),
        new MapLocation(30,60,factory.getLocationIcon('hospital')),

        new MapLocation(105,200,factory.getLocationIcon('parque')),
        new MapLocation(105,200,factory.getLocationIcon('parque')),
        new MapLocation(105,200,factory.getLocationIcon('parque')),
        new MapLocation(105,200,factory.getLocationIcon('parque')),

        new MapLocation(30,60,factory.getLocationIcon('hospital')),
        new MapLocation(30,60,factory.getLocationIcon('hospital')),
        new MapLocation(30,60,factory.getLocationIcon('hospital')),

        new MapLocation(95,60,factory.getLocationIcon('escuela')),
    ];

    locations.forEach(location => location.display());
}

main();