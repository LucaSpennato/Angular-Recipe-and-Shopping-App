import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reciped-edit',
  templateUrl: './reciped-edit.component.html',
  styleUrls: ['./reciped-edit.component.scss']
})
export class RecipedEditComponent implements OnInit {

  id: number
  editMode = false

  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recService: RecipeService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id']
        // dato che esiste anche la rotta new, controllare se esiste id, ci permette di capire
        // se siamo in edit o in new senza far crashare l'app
        this.editMode = params['id'] != null
        this.initForm()
      }
    )
  }

  private initForm(){
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeingredients = new FormArray([])

    if(this.editMode){
      const { name, imagePath, description, ingredients } = this.recService.getRecipe(this.id) 
      recipeName = name
      recipeImagePath = imagePath
      recipeDescription = description
      if(ingredients){
        for(let ingr of ingredients){
          recipeingredients.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
              'amount': new FormControl(ingr.amount, [Validators.required, Validators.min(1)]),
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeingredients
    })
  }

  get ingredientsControls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddingredient(){
    // accedo agli ingrediengts, creo un nuovo gruppo che conterrà i form control del nuovo gruppo
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(1, [Validators.required, Validators.min(1)])
      })
    )
  }

  onSubmit(){

    // recipe form essendo totalmente uguale al model, basta passare il recipeform.value senza creare una variabile
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )

    if(this.editMode){
      this.recService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onCancel(){
   this.router.navigate(['../'], { relativeTo: this.route })
  } 

  onDelete(){
    this.recService.deleteRecipe(this.id)
    this.onCancel()
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
