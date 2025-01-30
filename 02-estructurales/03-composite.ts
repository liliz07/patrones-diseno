/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */
interface FileSystemComponent{
    showDetails(ident?:string): void;
    
}

class File implements FileSystemComponent{
    private name: string; 

    constructor(name:string){
        this.name = name;
    }

    showDetails(ident: string= ''): void {
      console.log(`${ident} -Archivo: ${this.name}`);
    }
}


class Folder implements FileSystemComponent{
    private name: string;
    private contents: FileSystemComponent[] = [];

    constructor(name: string){
        this.name = name;
    }

    add(component: FileSystemComponent){
        this.contents.push(component);
    }

    showDetails(ident?: string): void {
      console.log(`${ident} +Carpeta: ${this.name} `);
      this.contents.forEach( component => component.showDetails( ident + ' '))
    }
}

function main(){
    const file1  = new File('archivo1.txt');
    const file2  = new File('archivo2.txt');
    const file3  = new File('archivo3.txt');
    const file4  = new File('archivo4.txt');


    const folder1 = new Folder('Carpeta1');

    folder1.add(file1)
    folder1.add(file2)
    folder1.showDetails();

    const folder2 = new Folder('Carpeta2');
    folder2.add(file3);


    const folder3 = new Folder('Carpeta3');
    folder3.add(file4);
    folder2.add(folder3);

    const rootFolder = new Folder('Carpeta ROOT');
    rootFolder.add(folder1);

    rootFolder.showDetails();

}

main();
