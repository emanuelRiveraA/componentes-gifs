import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

    //privado para evitar que alguien pueda hacer una mutacion directa fuera de mi servicio
    private _tagsHistory: string[] = [];

    constructor() { }

    get tagsHistory() {
        return [...this._tagsHistory];//con el operador spread se crea una copia
    }

    private organizedHistory( tag: string ){
        tag = tag.toLowerCase();

        //con esto borro el tag repetido
        if( this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag);
        }

        // con esto ingreso al tag al inicio 
        this._tagsHistory.unshift( tag );
        //con esto limito la lista a solo 10 tags
        this._tagsHistory = this._tagsHistory.splice(0,10);
    }

    public searchTag( tag: string ): void {
        if(tag.length === 0) return;

        this.organizedHistory(tag);
        // console.log(this.tagsHistory);
    }
    
}