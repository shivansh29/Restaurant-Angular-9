import { Ingredient } from './../shared/ingredient.model';
export class Recipie{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[]

    constructor(name: string,description: string,imagePath: string,inged: Ingredient[]){
        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingredients=inged;
    }
}