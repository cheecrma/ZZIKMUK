from django.contrib import admin
from .models import Ingredient, Recipe, RecipeDetail, RecipeIngredient

# Register your models here.
admin.site.register(Ingredient)
admin.site.register(Recipe)
admin.site.register(RecipeDetail)
admin.site.register(RecipeIngredient)