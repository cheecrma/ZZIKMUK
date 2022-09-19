from django.db import models

# Create your models here.
# class Article(models.Model):
#     title = models.CharField(max_length=30)
#     content = models.TextField()

class Ingredient(models.Model):
    name = models.CharField(max_length=100)

class Recipe(models.Model):
    food_name = models.CharField(max_length=100)
    title = models.CharField(max_length=350)
    title_img_url = models.TextField(blank=True, null=True)
    servings = models.CharField(max_length=50, blank=True, null=True)
    time = models.CharField(max_length=100, blank=True, null=True)
    level = models.IntegerField(blank=True, null=True)

class RecipeDetail(models.Model):
    recipe = models.ForeignKey(Recipe, models.DO_NOTHING)
    recipe_step = models.IntegerField()
    recipe_content = models.TextField()
    recipe_img_url = models.TextField(blank=True, null=True)

class RecipeIngredient(models.Model):
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')
    ingredient_name = models.TextField()
    ingredient_ammount = models.TextField(blank=True, null=True)