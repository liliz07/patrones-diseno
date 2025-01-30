/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../helpers/colors.ts";

interface Notification{
    send(message: string): void;
}
//punto de inicio de nuestra notificacion
class BasicNotification implements Notification{
  send(message: string): void {
    console.log(`%cEnviando notificación básica: %c${message}`, COLORS.blue, COLORS.white);
  }
}

//Clase decorador
abstract class NotificactionDecorator implements Notification{
    protected notificacion : Notification;

    constructor (notificacion: Notification){
        this.notificacion = notificacion;
    }

    send(message: string): void {
      this.notificacion.send(message);
    }    
}

//crear difetrente decoradores

class EmailDerator extends NotificactionDecorator{
    private sendEmail(message: string){
        console.log(`%cEnviando notificacion por correo electronico: %c${message}`, COLORS.green, COLORS.white);
    }

    override send(message: string): void {
      super.send(message);
      this.sendEmail(message);
    }
}

class SMSDerator extends NotificactionDecorator{
    private sendSMS(message: string){
        console.log(`%cEnviando notificacion por SMS: %c${message}`, COLORS.red, COLORS.white);
    }

    override send(message: string): void {
      super.send(message);
      this.sendSMS(message);
    }
}

//utilizando decoradores
function main(){
    let notification: Notification = new BasicNotification(); //

    notification = new EmailDerator(notification);
    notification = new SMSDerator(notification);

    notification.send('Alerta de sistema');
}

main();