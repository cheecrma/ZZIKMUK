import os
import io
import json
import re
from key import service

service.connect() # service key 연결

# Imports the Google Cloud client library
from google.cloud import vision

client = vision.ImageAnnotatorClient()

image_path = 'img/test2.jpg' #이미지 주소
with io.open(image_path, 'rb') as f:
    #content = base64.b64encode(f.read())
    content = f.read()

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


if response.error.message:
    raise Exception(
        '{}\nFor more info on error messages, check: '
        'https://cloud.google.com/apis/design/errors'.format(
            response.error.message))