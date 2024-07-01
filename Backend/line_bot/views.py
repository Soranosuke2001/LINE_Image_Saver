import os

from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from linebot.v3 import WebhookHandler

from .helpers import (
  verify_signature,
  construct_url,
  forward_request,
)

CHANNEL_SECRET = os.getenv('LINE_CHANNEL_SECRET', None)

handler = WebhookHandler(CHANNEL_SECRET)


# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class WebhookEvent(APIView):
  def post(self, request, format=None):
    verified = verify_signature(request, handler)

    if not verified:
      return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    events = request.data['events']

    for event in events:
      url = construct_url('line', event)

      if not url:
        return Response(status=status.HTTP_404_NOT_FOUND)
      
      if url == 'pass':
        continue
      
      response = forward_request(reverse(url), event)

      if not response.status_code == 200:
        return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

    return Response(status=status.HTTP_200_OK)