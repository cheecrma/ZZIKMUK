import os
import io
import json
import re
import base64

from .key import service
from google.cloud import vision
service.connect() # sservice key 연결

# image_path = 'img/test2.jpg' # TEST용

def receipt_ocr(path): # ocr api로 영수증 인식해서 구매내역 리스트 return

    client = vision.ImageAnnotatorClient()
    
    '''
    # 파일 받아올 때는 이걸로 사용
    with io.open(path, 'rb') as f:
        content = f.read()
    '''
    content = path # 실제 사용(request(base64 인코딩된 사진 정보)로 받아올때)

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Receipt List:')

    # 데이터 처리(엔터->sss로 대체, 문자만 남기고 제거, ss 기준으로 나눈 후 공백 제거)
    enter = re.sub(r'[\n]', "sss", texts[0].description)
    all_str = re.sub(r'[\W\s0-9]', "", enter)
    all_list = all_str.split("sss")
    all_list = ' '.join(all_list).split()
    #print(all_list)
    print("-----")
    print("구매내역")
    s, e = 0, len(all_list)-1 # 구매내역 시작, 끝

    for i in range(len(all_list)):
        if '상품' in all_list[i]:
            s = i
        if '면세' in all_list[i]:
            e = i
            break
    print(all_list[s+1:e]) # 영수증 글 OCR(좌표 X)
    print("------")
    return all_list[s+1:e]

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

def ing_list(path): # 형태소 분석으로 재료 뽑아내는 함수
    temp_list = receipt_ocr(path) # 임시 재료리스트(구매내역)
    '''
    목표
    1. temp_list를 형태소 분석(루씬)
    1-1. 이때 spam 거르는것처럼 과자나 단어 등 몇 개 담아서 거를수 있는거 거름
    2. 1의 결과를 DB와 비교해서 리스트에 담아줌(return)
    '''
    print("재료 리스트 출력")

    # return # 재료리스트 return

# ing_list('img/test2.jpg') # TEST용
