import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[dropDirective]'
})
export class DropDownCustom{

    @HostBinding('class.show') toggle: boolean = false;
    @HostListener('click') toggleopen(){
        console.log("parent listener");
        this.toggle= !this.toggle ;
    }

    constructor( private elRef: ElementRef){
        console.log(this.elRef.nativeElement.children);
    }

}

// Host listener is not able to get heirarchy and show class has to be used in <ul> not like shown in video
// But it is working on header