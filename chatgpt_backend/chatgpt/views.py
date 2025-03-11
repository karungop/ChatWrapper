import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from dotenv import load_dotenv
load_dotenv()

key = os.getenv('openaikey')

class ChatGPTAPIView(APIView):
    def post(self, request):
        user_input = request.data.get('input')
        print(user_input)
        
        if not user_input:
            return Response({"error": "Input is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        openai.api_key = key
        print(key)

        try:
            # Using the new OpenAI chat API
            response = openai.ChatCompletion.create(
                model="gpt-4",  # or gpt-3.5, or another model you prefer
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_input}
                ]
            )
            
            # Print the full response to inspect its structure
            print(response)
            
            # Correctly access the message content
            response_content = response['choices'][0]['message']['content'].strip()
            
            return Response({"response": response_content})
        
        except Exception as e:
            # Print the full exception message for debugging purposes
            print(f"Error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
