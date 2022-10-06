from django.shortcuts import render
# REST API
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from google.cloud import vision
from . import ocr

# Create your views here.
def index(request):
    return render(request, 'receipts/index.html')

# 영수증 인식 요청(request, post) -> OCR -> 재료분석 -> 리스트 return(response)
class ReceiptView(APIView):    
    
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['img'],
    properties={
        'path': openapi.Schema(type=openapi.TYPE_STRING, description="영수증 이미지 파일(jpg)")
    })

    @swagger_auto_schema(operation_id="영수증 OCR 분석",
    operation_description="영수증 사진 파일을 ocr 분석해 재료 리스트를 return",
    request_body=param, responses={200: "Success"})
    def post(self, request):
        try:
            img64 = request.data['path']
            list = ocr.ing_list(img64)
            if list == -1: # 분석 결과가 없음(OCR 인식 X or 인식된 재료 X)
                return Response(-1, status=400)
            if len(list) != 0:
                return Response(list)
            else:
                return Response("ocr 실패")
        except KeyError:
            print(request.data)
            return Response({"message": "KEY_ERROR"}, status=400)
        



