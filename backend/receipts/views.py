from django.shortcuts import render
#from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

import io
import re

from .key import service
from google.cloud import vision
service.connect() # service key 연결

# Create your views here.
def index(request):
    return render(request, 'receipts/index.html')

# 영수증 인식 요청(request, post) -> OCR -> 재료분석 -> 리스트 return(response)
class ReceiptView(APIView):

    def receipt_ocr(self, path): # ocr api로 영수증 인식해서 구매내역 리스트 return
        client = vision.ImageAnnotatorClient()

        with io.open(path, 'rb') as f:
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
        return all_list[s+1:e]

        if response.error.message:
            raise Exception(
                '{}\nFor more info on error messages, check: '
                'https://cloud.google.com/apis/design/errors'.format(
                    response.error.message))

    def ing_list(self, path): # 형태소 분석으로 재료 뽑아내는 함수
        temp_list = self.receipt_ocr(path) # 임시 재료리스트(구매내역)
        '''
        목표
        1. temp_list를 형태소 분석(루씬)
        1-1. 이때 spam 거르는것처럼 과자나 단어 등 몇 개 담아서 거를수 있는거 거름
        2. 1의 결과를 DB와 비교해서 리스트에 담아줌(return)
        '''
        print("재료 리스트 출력")

        # return # 재료리스트 return


    
    #parser_classes = (MultiPartParser, )
    
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['img'],
    properties={
        'img': openapi.Schema(type=openapi.TYPE_FILE, description="영수증 이미지 파일(jpg)")
    })    

    @swagger_auto_schema(operation_id="영수증 OCR 분석",
    operation_description="영수증 사진 파일을 ocr 분석해 재료 리스트를 return",
    request_body=param, responses={200: "Success"})
    def post(self, request):
        print(request.data['img'])
        list = self.receipt_ocr(request.data['img'])
        if len(list) != 0:
            return Response(list, status=HTTP.Success)
        else:
            return Response("ocr 실패", status=HTTP.Error_Not_Found)
    
    '''
    현재 문제점: multiparser 가 뭔가 문제가 있어서 swagger가 안 보이는듯 하다
    테스트: FILE이 제대로 들어오는지 확인
    '''
