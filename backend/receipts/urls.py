from django.urls import path
from . import views

app_name = 'receipts'

urlpatterns = [
    path('', views.index, name='index'),
    path('ocr', views.ReceiptView.as_view(), name='ocr'),
]
