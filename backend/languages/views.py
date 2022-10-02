from http.client import responses
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404

import time
import base64
from . import STT
from .key import service

class sound_to_text(APIView):
    def decode_64(self, data_64):
        decoded_data = base64.b64decode(data_64)
        video_result = open('./languages/tts.mp3', 'wb')
        video_result.write(decoded_data)
        return

    def post(self, request, format=None):

        data_64 = request.data['base_64']

        self.decode_64(data_64)
        print('mp3 create success')

        service.connect()
        audio_path = "./languages/tts.mp3"

        return_text = STT.speech_to_text(audio_path=audio_path)
        return_json = {
            'text': return_text
        }
        return JsonResponse(return_json)

