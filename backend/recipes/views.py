from ast import And
from http.client import responses
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
from numpy import dot
from numpy.linalg import norm
import numpy as np
from operator import itemgetter


from .serializers import IngredientSerializer, RecipeSerializer, RecipeDetailSerializer, RecipeIngredientSerializer, TipsSerializer
from .models import Ingredient, Recipe, RecipeDetail, RecipeIngredient, Tips
from recipes import serializers

# Create your views here.

# index.html (테스트용)
def index(request):
    ingre = Ingredient.objects.get(id=100)
    print(ingre.id)
    context = {
        'id': ingre.id,
        'name': ingre.name,
        'score':ingre.score
        }
    return render(request, 'recipes/index.html', context)


# 레시피 리스트 GET
class RecipeList(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='recipe id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="레시피 리스트 조회", operation_description="입력한 레시피 번호를 포함한 5개의 정보 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        r_list = []
        for i in range(id, id+5):
            id = i
            recipes = Recipe.objects.get(pk=id)
            tmp_list = [recipes.id, recipes.food_name, recipes.level, recipes.servings, recipes.time, recipes.title_img_url]
            r_list.append(tmp_list)
        return Response(r_list)


# 상세 레시피 조회 POST
class RecipeDetailList(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['id'],
    properties={
        'id': openapi.Schema(type=openapi.TYPE_NUMBER, description="레시피 번호"),
    }) 
    def get_object(self, id):
        try:
            recipe = Recipe.objects.get(pk=id)
            ingredients = RecipeIngredient.objects.filter(recipe_id = recipe.id)
            recipe.view_count += 1  # 조회수 갱신
            recipe.save()           # DB에 새로운 조회수 저장
            ing_list = []
            for i in ingredients:
                ing_list.append([i.ingredient_id.name, i.ingredient_amount])
            
            steps = RecipeDetail.objects.filter(recipe_id = recipe.id)
            step_list = []
            for s in steps:
                step_list.append(s.recipe_content)

            detail_list = [recipe.id, recipe.food_name, recipe.level, recipe.servings, recipe.time, recipe.title_img_url, ing_list, step_list]
            return detail_list

        except Recipe.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="상세 레시피 정보", operation_description="레시피 번호로 상세 정보 불러오기", request_body=param)
    def post(self, request, format=None):
        ingredient = self.get_object(request.data['id'])
        return Response(ingredient)


# 레시피 단계별 조회 POST
class RecipeStepList(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['recipe_id', 'recipe_step'],
    properties={
        'recipe_id': openapi.Schema(type=openapi.TYPE_NUMBER, description="레시피 번호"),
        'recipe_step': openapi.Schema(type=openapi.TYPE_NUMBER, description="요리 단계"),
    }) 
    def get_object(self, rid, rstep):
        try:
            recipe = Recipe.objects.get(pk=rid)
            step = RecipeDetail.objects.get(recipe_id=rid, recipe_step=rstep)
            steps = RecipeDetail.objects.filter(recipe_id=rid)
            
            detail_list = [recipe.id, recipe.food_name, rstep, step.recipe_img_url, step.recipe_content, len(steps)]
            return detail_list

        except RecipeDetail.DoesNotExist:
            raise Http404
    
    @swagger_auto_schema(operation_id="레시피 단계별 정보", operation_description="단계별 정보 불러오기", request_body=param)
    def post(self, request, format=None):
        print(request)
        recipe_step = self.get_object(request.data['recipe_id'], request.data['recipe_step'])
        return Response(recipe_step)


# 상세 레시피 조회 POST
class RecipeCompleteList(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['id'],
    properties={
        'id': openapi.Schema(type=openapi.TYPE_NUMBER, description="레시피 번호"),
    }) 
    def get_object(self, id):
        try:
            recipe = Recipe.objects.get(pk=id)
            complete_list = [recipe.food_name, recipe.title_img_url]
            return complete_list

        except Recipe.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="음식 완성 정보", operation_description="음식 완성 페이지", request_body=param)
    def post(self, request, format=None):
        complete = self.get_object(request.data['id'])
        return Response(complete)


# 인기 레시피 조회 POST
class RecipePopularList(APIView):
    def get_object(self):
        try:
            pop_recipe = Recipe.objects.all().order_by('-view_count')[:5]
            pop_list = []
            for pop in pop_recipe:
                tmp_list = [pop.id, pop.food_name, pop.level, pop.servings, pop.time, pop.title_img_url, pop.view_count]
                pop_list.append(tmp_list)
            return pop_list

        except Recipe.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="인기 레시피 리스트 조회", operation_description="조회수에 따른 상위 n개의 레시피 리스트 불러오기")
    def post(self, request, format=None):
        pop_list = self.get_object()
        return Response(pop_list)


# 레시피 검색 POST (음식 이름으로 검색)
class RecipeSearch(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['text'],
    properties={
        'text': openapi.Schema(type=openapi.TYPE_STRING, description="검색할 단어"),
    }) 
    def get_object(self, text):
        try:
            r_search = Recipe.objects.filter(food_name__contains=text).order_by('-view_count')
            if len(r_search) > 0:
                search_list = []
                for rlt in r_search:
                    num_ing = RecipeIngredient.objects.filter(recipe_id=rlt.id)     # 레시피별 재료 개수를 구하기 위한 ORM
                    num_ing = len(num_ing)
                    search_list.append([rlt.id, rlt.food_name, rlt.title_img_url, rlt.level, rlt.servings, rlt.time, rlt.view_count, num_ing])
                return search_list
            else:
                return("검색하신 '" + text + "'에 일치하는 메뉴가 없습니다.")

        except Recipe.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="레시피 검색 기능 (음식이름)", operation_description="String 입력으로 레시피 검색", request_body=param)
    def post(self, request, format=None):
        search_rlt = self.get_object(request.data['text'])
        return Response(search_rlt)


# 레시피 검색 POST (재료를 포함한 레시피 검색)
class RecipeSearchByIng(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['text'],
    properties={
        'text': openapi.Schema(type=openapi.TYPE_STRING, description="검색할 단어"),
    }) 
    def get_object(self, text):
        try:
            ingred = Ingredient.objects.filter(name=text)
            if ingred:
                for ing in ingred:
                    ing_id = int(ing.id)
                    search_list = []
                    ri_list = RecipeIngredient.objects.filter(ingredient_id=ing_id)
                    for rlt in ri_list:
                        num_ing = RecipeIngredient.objects.filter(recipe_id=rlt.recipe_id.id)   # 레시피별 재료 개수를 구하기 위한 ORM
                        num_ing = len(num_ing)
                        search_list.append([rlt.recipe_id.id, rlt.recipe_id.food_name, rlt.recipe_id.title_img_url, rlt.recipe_id.level, rlt.recipe_id.servings, rlt.recipe_id.time, rlt.recipe_id.view_count, num_ing])
                    search_list = sorted(search_list, key=itemgetter(6), reverse=True)
                    return search_list
            else:
                return("검색하신 '" + text + "'를 포함하는 레시피가 없습니다.")

        except Ingredient.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="레시피 검색 기능 (재료)", operation_description="String 입력으로 해당 재료를 포함하는 레시피 검색", request_body=param)
    def post(self, request, format=None):
        search_rlt = self.get_object(request.data['text'])
        return Response(search_rlt)


# 재료 검색 POST
class IngredientSearch(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['text'],
    properties={
        'text': openapi.Schema(type=openapi.TYPE_STRING, description="검색할 단어"),
    }) 
    def get_object(self, text):
        try:
            i_search = Ingredient.objects.filter(name__contains=text).order_by('name')
            if len(i_search) > 0:
                search_list = []
                for rlt in i_search:
                    search_list.append([rlt.id, rlt.name])
                return search_list
            else:
                return("검색하신 '" + text + "'에 일치하는 재료가 없습니다.")

        except Ingredient.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="재료 검색 기능", operation_description="String 입력으로 재료 검색", request_body=param)
    def post(self, request, format=None):
        search_rlt = self.get_object(request.data['text'])
        return Response(search_rlt)


# 요리 꿀팁 정보 GET
class TipsInfo(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='tips id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="꿀팁 조회", operation_description="꿀팁 전체 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        tip = Tips.objects.get(pk=id)
        return Response(tip.tip_content)


# 레시피 추천 POST
class RecipeSuggestion(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['user_ingredients'],
    properties={
        'user_ingredients': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Items(type=openapi.TYPE_STRING), description="재료 리스트"),
    })

    def get_object(self, user_ingredients):
        try:
            # 코사인 유사도 함수
            def cos_sim(a, b):
                return dot(a, b)/(norm(a)*norm(b))

            # 모든 재료 리스트와 특정 재료 리스트를 비교 후 벡터행렬 생성 함수
            def make_matrix(feats, list_data):
                freq_list = []
                for feat in feats:
                    freq = 0
                    for word in list_data:
                        if feat == word:
                            freq += 1
                    freq_list.append(freq)
                return freq_list
            
            # import time
            # start_t = time.time()     # 시간 측정 코드

            ingre_db = Ingredient.objects.all() # DB의 전체 재료 불러오기
            ingre_db_list = []
            for i_db in ingre_db:               # DB에 있는 모든 재료를 리스트로 변환
                ingre_db_list.append(i_db.name)
            feats = set(ingre_db_list)    # 사용자가 입력한 재료 리스트와 DB 전체 리스트를 세트로 묶기

            cs_list = []        # 모든 레시피와의 코사인 유사도를 담을 cs_list 생성
            recipe = Recipe.objects.all()
            for i in range(len(recipe)):
                ingredients = RecipeIngredient.objects.filter(recipe_id = recipe[i].id)
                ing_list = []
                for j in ingredients:
                    ing_list.append(j.ingredient_id.name)
                
                ing_arr = np.array(make_matrix(feats, user_ingredients))     # 사용자 입력 재료
                rec_arr = np.array(make_matrix(feats, ing_list))        # 해당 레시피 재료

                cs = cos_sim(ing_arr, rec_arr)          # 코사인 유사도 값 구하기
                cs_list.append([recipe[i].id, cs])      # cs_list에 [레시피 번호, 코사인 유사도 값] 누적하기
            
            sorted_list = sorted(cs_list, key=itemgetter(1), reverse=True)  # 전체 코사인 유사도를 내림차순으로 정렬
            rlt_list = []       # 코사인 유사도가 높은순으로 레시피 번호를 담을 rlt_list 생성
            for rlt in sorted_list[:10]:        # 코사인 유사도 순위대로 n개의 레시피 번호 담기
                recipe = Recipe.objects.get(pk=rlt[0])
                rlt_list.append([recipe.id, recipe.food_name, recipe.title_img_url, recipe.level, recipe.servings, recipe.time, recipe.view_count])

            # print("----- %s 초 -----" %(time.time() - start_t))   # 시간 측정 코드

            return(rlt_list)

        except Ingredient.DoesNotExist:
            raise Http404

    @swagger_auto_schema(operation_id="레시피 추천 기능", operation_description="재료 리스트 입력으로 최적의 레시피 추천", request_body=param)
    def post(self, request, format=None):
        suggestion_rlt = self.get_object(request.data['user_ingredients'])
        return Response(suggestion_rlt)