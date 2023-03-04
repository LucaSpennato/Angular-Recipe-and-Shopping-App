import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reciped-edit',
  templateUrl: './reciped-edit.component.html',
  styleUrls: ['./reciped-edit.component.scss']
})
export class RecipedEditComponent implements OnInit {

  id: number
  editMode = false

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id']
        // dato che esiste anche la rotta new, controllare se esiste id, ci permette di capire
        // se siamo in edit o in new senza far crashare l'app
        this.editMode = params['id'] != null
      }
    )
  }
}
