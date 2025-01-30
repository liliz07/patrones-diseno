/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Projector{

    turnOn(){
        console.log('Proyector encendido');
    }

    turnOff(){
        console.log('Proyector apagado');
    }
}

class SoundSystem{
    on(){
        console.log('Sistema de sonido encendido');
    }
    off(){
        console.log('Sistema de sonido apagado');
    }

}

class VideoPlayer{
    on(){
        console.log('Vodeo player encendido');
    }
    play(movie: string){
        console.log(`Reproduciento %c${movie}`, COLORS.blue);
    }

    stop(){
        console.log('Pelicula detenida');
    }

    off(){
        console.log('Video player apagado');
    }
}


class PopCornMaker{
    poppingPopcorn(){
        console.log('Cocinando palomitas de maiz');
    }

    turnOffPoppingPopcorn(){
        console.log('Deteniendo las palomitas');
    }
}

interface HomeTheaterFacadeOptions{
     projector: Projector;
     soundSystem: SoundSystem;
     videoPlayer: VideoPlayer;
     popcornMaker: PopCornMaker;
}

class HomeTheaterFacade{  
    private project: Projector;
    private soundSystem : SoundSystem;
    private videoPlayer : VideoPlayer;
    private popcornMaker : PopCornMaker;

    constructor(
        {
            projector,
            soundSystem, 
            videoPlayer, 
            popcornMaker}: HomeTheaterFacadeOptions){
        this.project = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker;
    }

    watchMovie(movier: string): void{
        console.log(`%cPreparando para ver la pelicula `,COLORS.blue);

        this.project.turnOn();
        this.soundSystem.on();
        this.popcornMaker.poppingPopcorn();
        this.videoPlayer.on();
        this.videoPlayer.play('AVENGERS');

        console.log('%cDisfrute la pelicula', COLORS.blue);
    }

    endWatchMovie(movier: string): void{
        console.log(`\n%cPreparando para ver la pelicula `,COLORS.blue);

        this.project.turnOff();
        this.soundSystem.off();
        this.popcornMaker.turnOffPoppingPopcorn();
        this.videoPlayer.stop();
        this.videoPlayer.off();       

        console.log(`%cSistema apagado`, COLORS.blue);
    }
}

//utilizando el patron facade
function main(){
    const projector = new Projector();
    const soundSystem = new SoundSystem();
    const videoPlayer = new VideoPlayer();
    const popcornMaker = new PopCornMaker();

    const homeTheater = new HomeTheaterFacade({
        projector, 
        soundSystem, 
        videoPlayer, 
        popcornMaker,
    });

    homeTheater.watchMovie('AVENGERS');
}



main();