import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os

key  = os.getenv('openaikey')

class ChatGPTAPIView(APIView):
    def post(self, request):
        user_input = request.data.get('input')
        if not user_input:
            return Response({"error": "Input is required"}, status=status.HTTP_400_BAD_REQUEST)
        

        #######################I need to add my  key here#####################        
        openai.api_key = key
        #######################I need to add my  key here#####################
        try:
            response = openai.Completion.create(
                model="text-davinci-003",  # Or another model
                prompt=user_input,
                max_tokens=150
            )
            return Response({"response": response.choices[0].text.strip()})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
