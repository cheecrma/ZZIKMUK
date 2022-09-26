# manage.py 경로에 db_uploader.py
import os
import django
import csv
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "zzikmuk.settings")
django.setup()

from recipes.models import *  # django.setup() 이후에 임포트해야 오류가 나지 않음



# ingredient table 삽입
CSV_PATH_PRODUCTS='tables/ingredient.csv'

with open(CSV_PATH_PRODUCTS, 'rt', encoding='cp949') as in_file:
    data_reader = csv.reader(in_file)
    next(data_reader, None) # 출력시 함께 출력되는 맨첫줄을 제외하고 출력하기 위함
    for row in data_reader:
        print(row[0])
        id_csv = row[0]
        name_csv = row[1]
        score_csv = row[2]
        Ingredient.objects.create(id=id_csv, name=name_csv, score=score_csv)


# recipe table 삽입
CSV_PATH_PRODUCTS='tables/recipe.csv'

with open(CSV_PATH_PRODUCTS, 'rt', encoding='cp949') as in_file:
    data_reader = csv.reader(in_file)
    next(data_reader, None) # 출력시 함께 출력되는 맨첫줄을 제외하고 출력하기 위함
    for row in data_reader:
        print(row[0])
        id_csv = row[0]
        food_name_csv = row[1]
        title_csv = row[2]
        title_img_url_csv = row[3]
        servings_csv = row[4]
        time_csv = row[5]
        level_csv = row[6]
        view_count_csv = row[7]
        Recipe.objects.create(id=id_csv, food_name=food_name_csv, title=title_csv, title_img_url=title_img_url_csv,
                                servings=servings_csv, time=time_csv, level=level_csv, view_count=view_count_csv)


# recipe_detail table 삽입
CSV_PATH_PRODUCTS='tables/recipe_detail.csv'

with open(CSV_PATH_PRODUCTS, 'rt', encoding='cp949') as in_file:
    data_reader = csv.reader(in_file)
    next(data_reader, None) # 출력시 함께 출력되는 맨첫줄을 제외하고 출력하기 위함
    for row in data_reader:
        print(row[0])
        id_csv = row[0]
        recipe_id_csv = row[1]
        recipe_id_pk = Recipe.objects.get(id=recipe_id_csv)
        recipe_step_csv = row[2]
        recipe_content_csv = row[3]
        recipe_img_url_csv = row[4]
        RecipeDetail.objects.create(id=id_csv, recipe_id=recipe_id_pk, recipe_step=recipe_step_csv,
                                    recipe_content=recipe_content_csv, recipe_img_url=recipe_img_url_csv)


# recipe_ingredient table 삽입
CSV_PATH_PRODUCTS='tables/recipe_ingredient.csv'

with open(CSV_PATH_PRODUCTS, 'rt', encoding='cp949') as in_file:
    data_reader = csv.reader(in_file)
    next(data_reader, None) # 출력시 함께 출력되는 맨첫줄을 제외하고 출력하기 위함
    for row in data_reader:
        print(row[0])
        id_csv = row[0]
        recipe_id_csv = row[1]
        recipe_id_pk = Recipe.objects.get(id=recipe_id_csv)
        ingredient_id_csv = row[2]
        ingredient_id_pk = Ingredient.objects.get(id=ingredient_id_csv)
        ingredient_amount_csv = row[3]
        RecipeIngredient.objects.create(id=id_csv, recipe_id=recipe_id_pk, ingredient_id=ingredient_id_pk,
                                    ingredient_amount=ingredient_amount_csv)