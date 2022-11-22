from rest_framework import serializers
from .models import Ingredient, Recipe, RecipeDetail, RecipeIngredient, Tips

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'score')

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id', 'food_name', 'title', 'title_img_url', 'servings', 'time', 'level', 'view_count')

class RecipeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeDetail
        fields = ('id', 'recipe_id', 'recipe_step', 'recipe_content', 'recipe_img_url')

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ('id', 'recipe_id', 'ingredient_id', 'ingredient_amount')

class TipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tips
        fields = ('id', 'tip_content')