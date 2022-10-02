from http.client import responses
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
import os

import base64
import STT

def Decode_64(data_64):
    decoded_data = base64.b64decode(data_64)
    video_result = open('./languages/tts.mp3', 'wb')
    video_result.write(decoded_data)
    return


@api_view(['POST'])
def STT(request):
    if request.method == 'POST':
        print(request.data)
        data_64 = request.data.get('data')
        print(data_64)

        Decode_64(data_64)

        file_list = os.listdir(os.getcwd())

        service.connect()
        audio_path = "tts"
        return STT.speech_to_text(audio_path=audio_path)

