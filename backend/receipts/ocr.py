import re
import os

# 현재 파일 위치
now = os.path.dirname(__file__)

# Ingredient DB 사용
from recipes.models import Ingredient

# GCP 사용
from .key import service
from google.cloud import vision
service.connect() # sservice key 연결


def receipt_ocr(path): # ocr api로 영수증 인식해서 구매내역 리스트 return

    client = vision.ImageAnnotatorClient()

    content = path # request(base64 인코딩된 사진 정보)로 받아옴

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    # 데이터 전처리
    # 1. 엔터->sss로 대체, 문자만 남기고 제거, ss 기준으로 나눈 후 공백 제거
    if len(texts) == 0:
        return -1
    enter = re.sub(r'[\n]', "sss", texts[0].description)
    all_str = re.sub(r'[\W\s0-9]', "", enter)
    all_list = all_str.split("sss")
    all_list = ' '.join(all_list).split()
    # 2. 재료 부분 위주로 데이터 정제
    s, e = 0, len(all_list)-1 # 구매내역 시작, 끝
    for i in range(len(all_list)):
        if '금액' in all_list[i]:
            s = i
        if '면세' in all_list[i]:
            e = i
            break

    return all_list[s+1:e]

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

def ing_list(path): # 형태소 분석으로 재료 뽑아내는 함수
    ocr_list = receipt_ocr(path)

    if ocr_list==-1: # 분석된 글자 없으면 에러
        return -1
    # 재료 분석
    # 1. 한글만 남겨서 데이터 정리
    ocr_list = list(map(lambda ing: re.sub('[^가-힣]', "", ing), ocr_list))

    remove = os.path.join(now, 'check/notIng.txt') # 비재료 사전
    change = os.path.join(now, 'check/changeIng.txt') # 상품명 대체 사전
    
    # 2. 비재료사전을 돌며 비재료 제외
    with open(remove, 'r', encoding='utf-8') as r:
        for line in r.readlines():
            line = line.strip('\n')
            for i in range(len(ocr_list)):
                if line in ocr_list[i]:
                    ocr_list[i] = ''
    ocr_list = list(filter(lambda ing: ing != '', ocr_list))

    # 3. 상품명대체사전을 돌며 상품명을 재료명(DB)으로 변경
    with open(change, 'r', encoding='utf-8') as c:
        for line in c.readlines():
            line = line.strip('\n')
            line = list(line.split(', '))
            for i in range(len(ocr_list)):
                for j in range(1, len(line)):
                    if line[j] in ocr_list[i]:
                        ocr_list[i] = ocr_list[i].replace(line[j], line[0])
    
    # 4. Ingredient(DB)를 돌며 ocr_list에 재료가 있으면 재료명을 저장
    ing_all = Ingredient.objects.all()
    ings = []
    checks = [0 for i in range(len(ocr_list))]

    for ing in ing_all:
        for o in range(len(ocr_list)):
            # 5. 재료 리스트에 추가(한 글자 재료인 경우 재확인)
            if ing.name in ocr_list[o]:
                if checks[o] != 0: # 한 글자인 경우 더 많이 겹치는 재료가 있으면 해당 재료로 변경
                    ings[checks[o]] = ing.name
                    checks[o] = 0 # 한 글자 이상의 재료로 바꿨으니 다시 0으로 변경
                else: # checks[0] == 0
                    ings.append(ing.name)
                    if len(ing.name) == 1: # 재료명이 한 글자면 check에 ings 위치 저장
                        checks[o] = len(ings)-1

    if len(ings) < 1: # 재료 리스트에 들어간 재료 없을 때 에러
        return -1
    ings = set(ings) # 중복 재료 제거
    return list(ings)
