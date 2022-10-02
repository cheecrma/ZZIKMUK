from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'languages'

urlpatterns = [
    path('stt/', views.STT, name='STT'),
]