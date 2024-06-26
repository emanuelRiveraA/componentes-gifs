import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar:</h5>
        <input type="text" class="form-control" placeholder="Buscar gifs..." 
        (keyup.enter)="searchTag()" 
        #txtTagInput 
        >
    `
})

// #txtTagInput --->>>> es conocido como una referencia local tambien se conoce como viewChild

export class SearchBoxComponent{

    @ViewChild('txtTagInput')  // el " ! " indica que siempre va a tener un valor
    public tagInput!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService) { }

    // searchTag ( newTag: string): void { para aplicar esta forma se pasa el argumento "txtTagInput.value"
    searchTag ( ): void {
        
        const newTag = this.tagInput.nativeElement.value;
        // console.log({newTag});
        this.gifsService.searchTag( newTag );

        this.tagInput.nativeElement.value = '';

    }
}