import csv
from ast import literal_eval
import numpy as np
import pandas as pd


### csv 파일 읽기 기본 구조 ###
# f = open('ingredient.csv', 'r', encoding='cp949')
# rdr = csv.reader(f)
# data = []
# for line in rdr:
#   data.append(line)

# print(data)
# f.close()

'''
### recipe 테이블 생성 ###
f = open('recipe_crawl_data.csv', 'r', encoding='cp949')
rdr = csv.reader(f)
data = []
for line in rdr:
  temp_d = line[:7]
  temp_d.append(int(0))
  data.append(temp_d)

print(data)
print(len(data))

# df = pd.DataFrame(data[1:], columns=['id', 'food', 'title', 'title_img_url', 'servings', 'time', 'level', 'view_count'])
# df.to_csv('recipe.csv', encoding='utf-8-sig', index=False)

f.close()


### ingredient 테이블 생성 ###
f = open('recipe_crawl_data.csv', 'r', encoding='cp949')
rdr = csv.reader(f)
data = []
for line in rdr:
  data.append(line)

ingred_set = set()
for i in range(1, len(data)):
  temp_d = np.array(literal_eval(data[i][7]))
  for j in range(len(temp_d)):
    ingredient = temp_d[j][0]
    ingred_set.add(ingredient)

print(ingred_set)
print(len(ingred_set))

# df = pd.DataFrame(ingred_set, columns=['name'])
# df.to_csv('ingredient.csv', encoding='utf-8-sig', index=False)

f.close()


### recipe_detail 테이블 생성 ###
f = open('recipe_crawl_data.csv', 'r', encoding='cp949')
rdr = csv.reader(f)
data = []
for line in rdr:
  data.append(line)

recipe_detail = []
id = 0
for i in range(1, len(data)):
  recipe_id = i
  temp_d = np.array(literal_eval(data[i][8]))
  for j in range(len(temp_d)):
    recipe_step = j + 1
    recipe_content = temp_d[j][0]
    recipe_img_url = temp_d[j][1]
    id += 1
    
    recipe_detail.append([id, recipe_id, recipe_step, recipe_content, recipe_img_url])

print(recipe_detail)
# df = pd.DataFrame(recipe_detail, columns=['id', 'recipe_id', 'recipe_step', 'recipe_content', 'recipe_img_url'])
# df.to_csv('recipe_detail.csv', encoding='utf-8-sig', index=False)

f.close()
'''


### recipe_ingredient 테이블 생성 ###
