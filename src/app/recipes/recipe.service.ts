import { Recipe } from './../recipes/recipe.model';

export class RecipeService{

    private recipies: Recipe[] = [
        new Recipe('pizzazza', 'test desc', 
            'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9'),
        new Recipe('focaccia', 'test desc', 
        'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9')
    ] 

    getRecipies(){
        // usiamo slice solo per darci una copia e non una reference, altrimenti sarebbe modificabile
        // nonostante il private
        return this.recipies.slice()
    }

}