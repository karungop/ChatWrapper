from django.urls import path
from .views import ChatGPTAPIView

urlpatterns = [
    path('chat/', ChatGPTAPIView.as_view(), name='chatgpt'),
]
