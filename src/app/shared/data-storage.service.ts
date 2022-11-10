import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  urlFireBase = 'https://httpproject-279-286-default-rtdb.asia-southeast1.firebasedatabase.app/';

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipeUrl = this.urlFireBase + 'recipes.json'
    const recipes = this.recipeService.getRecipes();
    this.http.put(recipeUrl, recipes)
      .subscribe(
        response => {
          console.log(response)
        }
      )
  }

  fetchRecipes() {
    const recipeUrl = this.urlFireBase + 'recipes.json';
    this.http
      .get<Recipe[]>(recipeUrl)
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      })
  }

}
