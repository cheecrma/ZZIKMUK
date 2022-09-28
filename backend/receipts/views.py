from django.shortcuts import render
#from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

import io
import re
import os

from google.cloud import vision
from . import ocr

# Create your views here.
def index(request):
    return render(request, 'receipts/index.html')

# 영수증 인식 요청(request, post) -> OCR -> 재료분석 -> 리스트 return(response)
class ReceiptView(APIView):
    
    #parser_classes = (MultiPartParser, )
    
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['img'],
    properties={
        'img': openapi.Schema(type=openapi.TYPE_FILE, description="영수증 이미지 파일(jpg)")
    })    

    @swagger_auto_schema(operation_id="영수증 OCR 분석",
    operation_description="영수증 사진 파일을 ocr 분석해 재료 리스트를 return",
    request_body=param, responses={200: "Success"})
    def post(self, request):
        # print(request.data['img'])
        # list = self.receipt_ocr(request.data['img'])
        directory_path = os.path.dirname(__file__)
        file_path = os.path.join(directory_path, request.data['img'])
        list = ocr.receipt_ocr(file_path)
        #list = self.receipt_ocr("img/test1.jpg")
        if len(list) != 0:
            return Response(list)
        else:
            return Response("ocr 실패")
    
    '''
    현재 문제점: multiparser 가 뭔가 문제가 있어서 swagger가 안 보이는듯 하다
    테스트: FILE이 제대로 들어오는지 확인
    '''


