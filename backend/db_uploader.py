# manage.py 경로에 db_uploader.py
import os
import django
import csv
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "zzikmuk.settings")
django.setup()

from recipes.models import *  # django.setup() 이후에 임포트해야 오류가 나지 않음

CSV_PATH_PRODUCTS='tables/ingredient.csv'

with open(CSV_PATH_PRODUCTS) as in_file:
    data_reader = csv.reader(in_file)
    next(data_reader, None) # 출력시 함께 출력되는 맨첫줄을 제외하고 출력하기 위함
    for row in data_reader:
        id_csv = row[0]
        name_csv = row[1]
        score_csv = row[2]
        Ingredient.objects.create(id=id_csv, name=name_csv, score=score_csv)