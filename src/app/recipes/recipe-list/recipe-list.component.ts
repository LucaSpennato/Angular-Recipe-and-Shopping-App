import { Recipe } from './../recipe.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  recipies: Recipe[] = [
    new Recipe('Test recipe', 'test desc', 
      'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9'),
      new Recipe('Test recipe', 'test desc', 
      'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9')
  ] 

}
