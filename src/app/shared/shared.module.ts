import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropDownCustom } from './Dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';


@NgModule({
    declarations: [   
    DropDownCustom,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
    DropDownCustom,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule
    ]
})
export class SharedModule{

}