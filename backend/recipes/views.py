from http.client import responses
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404

from .serializers import IngredientSerializer, RecipeSerializer, RecipeDetailSerializer, RecipeIngredientSerializer, TipsSerializer
from .models import Ingredient, Recipe, RecipeDetail, RecipeIngredient, Tips
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

    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['id'],
    properties={
        'id': openapi.Schema(type=openapi.TYPE_NUMBER, description="재료 번호")
    }) 


    def get_object(self, pk):
        try:
            return Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="재료 정보", operation_description="재료 번호로 정보 불러오기", request_body=param)
    def post(self, request, format=None):
        ingredient = self.get_object(request.data['id'])
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

# # 레시피 정보 GET
# class RecipeInfo(APIView):
#     def get(self, request, id):
#         recipe = Recipe.objects.get(pk=id)
#         serializer = RecipeSerializer(recipe)
#         return Response(serializer.data)

# 레시피 정보 GET
class RecipeInfo(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='recipe id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="레시피 조회", operation_description="레시피 번호로 간단한 레시피 정보 조회",
    manual_parameters=[id], responses={200: '조회 성공'})
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


# 꿀팁s 정보 GET
class TipsInfo(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='tips id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="꿀팁 조회", operation_description="꿀팁 전체 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        tips = Tips.objects.get(pk=id)
        serializer = TipsSerializer(tips)
        return Response(serializer.data)