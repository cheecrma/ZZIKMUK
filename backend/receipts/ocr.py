import io
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


# image_path = 'img/test2.jpg' # TEST용

def receipt_ocr(path): # ocr api로 영수증 인식해서 구매내역 리스트 return

    client = vision.ImageAnnotatorClient()
    
    
    # 파일 받아올 때는 이걸로 사용
    with io.open(path, 'rb') as f:
        content = f.read()
    
    #content = path # 실제 사용(request(base64 인코딩된 사진 정보)로 받아올때)

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Receipt List:')

    # 데이터 처리(엔터->sss로 대체, 문자만 남기고 제거, ss 기준으로 나눈 후 공백 제거)
    if len(texts) == 0:
        return -1
    enter = re.sub(r'[\n]', "sss", texts[0].description)
    all_str = re.sub(r'[\W\s0-9]', "", enter)
    all_list = all_str.split("sss")
    all_list = ' '.join(all_list).split()
    #print(all_list)
    print("-----")
    print("구매내역")
    s, e = 0, len(all_list)-1 # 구매내역 시작, 끝
    for i in range(len(all_list)):
        if '금액' in all_list[i]:
            s = i
        if '면세' in all_list[i]:
            e = i
            break
    #print(all_list[s+1:e]) # 영수증 글 OCR(좌표 X)
    print("------")
    return all_list[s+1:e]

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

def ing_list(path): # 형태소 분석으로 재료 뽑아내는 함수
    #ocr_list = receipt_ocr(path) # 임시 재료리스트(구매내역)
    # 테스트용 데이터
    ocr_list = ['면세', '강릉심층수', '하선정까나리액젓G', '매일저지방우유기획ml', '오뚜기델리케찹g', '코드다발무우다발', '새우깡',
    '코드대파단', '세척당근', '동원참치마일드', '미나리', '허니버터칩', '히말라야소금', '할인액']
    print("ocr_list:", ocr_list)
    if ocr_list==-1 or len(ocr_list)<1: # 분석된 글자 X -> 사진 다시 찍어야함
        return -1
    
    remove = os.path.join(now, 'check/notIng.txt')
    change = os.path.join(now, 'check/changeIng.txt')
    
    # 비재료사전(notIng.txt)을 돌며 비재료 제외
    with open(remove, 'r', encoding='utf-8') as r:
        for line in r.readlines():
            line = line.strip('\n')
            for i in range(len(ocr_list)):
                if line in ocr_list[i]:
                    print("line과 temp: ", ocr_list[i])
                    ocr_list[i] = ''
    ocr_list = list(filter(lambda ing: ing is not '', ocr_list))
    print("remove: ", ocr_list)

    # 상품명사전(changeIng.txt)을 돌며 상품명을 재료명(DB)으로 바꿔줌
    with open(change, 'r', encoding='utf-8') as c:
        for line in c.readlines():
            line = line.strip('\n')
            line = list(line.split(', '))
            for i in range(len(ocr_list)):
                for j in range(1, len(line)):
                    if line[j] in ocr_list[i]:
                        print("기존 단어: ", ocr_list[i])
                        ocr_list[i] = ocr_list[i].replace(line[j], line[0])
                        print("바뀐 단어: ", ocr_list[i])
    print("change: ", ocr_list)
    
    # Ingredient를 돌며 ocr_list에 재료가 있으면 해당 재료의 id와 재료를 리스트에 저장[id, name]
    ing_all = Ingredient.objects.all()
    ings = []
    for ing in ing_all:
        for x in ocr_list:
            if ing.name in x:
                ings.append([ing.id, ing.name])
    
    print("재료 리스트 출력")
    print("ings: ", ings)
    return ings
    '''
    현재 문제점: 포함관계인 DB도 같이 나옴
    ex) 참치캔 -> 참치, 참치캔 모두 데이터에 들어감
    추가로 해야할 것: 예외처리 디테일, 리드미에 재료 추출방법 작성
    '''

path = os.path.join(now, 'img/test2.jpg')
ing_list(path) # TEST용
