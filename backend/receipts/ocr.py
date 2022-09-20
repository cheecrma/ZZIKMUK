import os
import io
import uuid
import time
import base64
import json
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

all_list = texts[0].description.split("\n")
for i in range(len(all_list)):
    if all_list[i].isdigit(): # 숫자인건 없애고 싶은데 아직 해결 안됨!
        print(all_list[i])
        all_list[i] = '숫자'
    if '001' in all_list[i]:
        print(i, "번부터 구매내역")
        print(all_list[i:])
        break
#print(all_list) # 영수증 글 OCR(좌표 X)
print("------")


if response.error.message:
    raise Exception(
        '{}\nFor more info on error messages, check: '
        'https://cloud.google.com/apis/design/errors'.format(
            response.error.message))