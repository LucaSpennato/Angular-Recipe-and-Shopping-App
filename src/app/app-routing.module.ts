import { AuthComponent } from './auth/auth.component';

import { RecipesResolveService } from './recipes/recipes-resolver.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipedEditComponent } from './recipes/reciped-edit/reciped-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipies', pathMatch: 'full' },
  {
    path: 'recipies',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipedEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolveService],
      },
      {
        path: ':id/edit',
        component: RecipedEditComponent,
        resolve: [RecipesResolveService],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'recipies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class ApproutingModule {}
