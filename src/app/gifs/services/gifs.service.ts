import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    //privado para evitar que alguien pueda hacer una mutacion directa fuera de mi servicio
    private _tagsHistory: string[] = [];
    private apikey:       string = '';
    private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

    constructor( private http: HttpClient) { 
        this.loadLocalStorage();
        console.log( 'Gifs Service Ready' );
    }

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
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem( 'history', JSON.stringify( this._tagsHistory ));
    }

    private loadLocalStorage(): void {
        if(!localStorage.getItem( 'history' )) return;
        this._tagsHistory = JSON.parse( localStorage.getItem( 'history' )! );//PONER EL ! PARA DECIRLE QUE SIEMPRE VA AVENIR UNA DATA 
        
        if( this._tagsHistory.length === 0) return;
        this.searchTag( this._tagsHistory[0] ); //cargar el primer tag
    }

    public searchTag( tag: string ): void {
        if(tag.length === 0) return;

        this.organizedHistory(tag);
        // console.log(this.tagsHistory);

        // fetch('https://api.giphy.com/v1/gifs/search?api_key=apikey&q=VALORANT&limit=10')
        // .then( resp => resp.json() )
        // .then( data => console.log(data) );

        const params = new HttpParams()
            .set('api_key', this.apikey)
            .set('limit', 10)
            .set('q', tag);

                    // aqui va el tipo de dato
        this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
            .subscribe( resp => {
                
                this.gifList = resp.data;
                // console.log( { gifs: this.gifList } );
            } )
    }
    
}