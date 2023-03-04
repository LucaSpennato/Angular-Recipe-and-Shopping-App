import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'recipies', pathMatch: 'full' },
    { path: 'recipies', component: RecipesComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '**', redirectTo: 'recipies', pathMatch: 'full' },

]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ApproutingModule{

}