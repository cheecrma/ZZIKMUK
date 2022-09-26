from django.db import models

# Create your models here.
# Create your models here.
# class Article(models.Model):
#     title = models.CharField(max_length=30)
#     content = models.TextField()

class Ingredient(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    score = models.IntegerField()

class Recipe(models.Model):
    id = models.IntegerField(primary_key=True)
    food_name = models.CharField(max_length=100)
    title = models.CharField(max_length=350)
    title_img_url = models.TextField(blank=True, null=True)
    servings = models.IntegerField(blank=True, null=True)
    time = models.IntegerField(blank=True, null=True)
    level = models.IntegerField(blank=True, null=True)
    view_count = models.IntegerField(blank=True, null=True)

class RecipeDetail(models.Model):
    id = models.IntegerField(primary_key=True)
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')
    recipe_step = models.IntegerField()
    recipe_content = models.TextField()
    recipe_img_url = models.TextField(blank=True, null=True)

class RecipeIngredient(models.Model):
    id = models.IntegerField(primary_key=True)
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')
    ingredient_id = models.ForeignKey(Ingredient, models.DO_NOTHING, db_column='ingredient_id')
    ingredient_amount = models.TextField(blank=True, null=True)