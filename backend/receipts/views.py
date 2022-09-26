from django.shortcuts import render
#from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Create your views here.
def index(request):
    return render(request, 'receipts/index.html')

# TEST용
class ReceiptView(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT,
    properties={
        #'img': openapi.Schema(type=openapi.TYPE_STRING, description="영수증 이미지 파일(jpg)")
        'test': openapi.Schema(type=openapi.TYPE_STRING, description="테스트용"),
    }
    )

    @swagger_auto_schema(operation_id=["영수증 OCR 분석"], operation_description="영수증 사진 파일을 ocr 분석해 재료 리스트를 return",
    request_body=param)
    def post(self, request):
        import ocr
        if ocr.ocr(request.test) != 0:
            return Response("ocr 인식", status=HTTP.Success)
        else:
            return Response("ocr 실패", status=HTTP_Error_Not_Found)
    
'''
현재 문제점: swagger api 제대로 안 뜸
원인: classView 안에 함수들이 제대로 안 짜여져서 그런 것으로 추정
함수를 다시 만들어보자
'''