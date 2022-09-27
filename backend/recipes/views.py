from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import IngredientSerializer, RecipeSerializer, RecipeDetailSerializer, RecipeIngredientSerializer
from .models import Ingredient, Recipe, RecipeDetail, RecipeIngredient
from recipes import serializers

# Create your views here.
def index(request):
    ingre = Ingredient.objects.get(id=100)
    print(ingre.id)
    context = {
        'id': ingre.id,
        'name': ingre.name,
        'score':ingre.score
        }
    return render(request, 'recipes/index.html', context)


# 재료 정보
class IngredientInfo(APIView):
    def get_object(self, pk):
        try:
            return Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            raise Http404
    
    def post(self, request, pk, format=None):
        ingredient = self.get_object(pk)
        serializer = IngredientSerializer(ingredient)
        return Response(serializer.data)

'''
# 레시피 정보 POST
class RecipeInfo(APIView):
    def get_object(self, id):
        try:
            return Recipe.objects.get(pk=id)
        except Recipe.DoesNotExist:
            raise Http404
    
    def post(self, request, id, format=None):
        recipe = self.get_object(id)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)
'''

# 레시피 정보 GET
class RecipeInfo(APIView):
    def get(self, request, id):
        recipe = Recipe.objects.get(pk=id)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)


# 레시피 단계별 정보
class RecipeDetailInfo(APIView):
    def get_object(self, rid, rstep):
        try:
            return RecipeDetail.objects.get(recipe_id=rid, recipe_step=rstep)
        except RecipeDetail.DoesNotExist:
            raise Http404
    
    def post(self, request, rid, rstep, format=None):
        recipe_d = self.get_object(rid, rstep)
        serializer = RecipeDetailSerializer(recipe_d)
        return Response(serializer.data)


# 레시피 재료 정보
class RecipeIngredientInfo(APIView):
    def get_object(self, no):
        try:
            return RecipeIngredient.objects.get(pk=no)
        except RecipeIngredient.DoesNotExist:
            raise Http404
    
    def post(self, request, no, format=None):
        recipe_i = self.get_object(no)
        serializer = RecipeIngredientSerializer(recipe_i)
        return Response(serializer.data)