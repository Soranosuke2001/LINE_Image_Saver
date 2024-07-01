from datetime import datetime

from django.test import Client

from linebot.v3.exceptions import InvalidSignatureError

from .constants import (
  LINE_ROUTES,
  AWS_ROUTES
)


# Forward POST request
def forward_request(url, data):
  client = Client()
  response = client.post(url, data, content_type='application/json')
  return response


# Verify the Signature
def verify_signature(request, handler):
  if not request:
    return False

  signature = request.headers['X-Line-Signature']
  body = request.body.decode('utf-8')

  try:
    handler.handle(body, signature)
    return True
  except InvalidSignatureError:
    print("Invalid Signature")
    return False
  

# Check the event type
def construct_url(url_type, event):
  if url_type == 'line':
    if not event['type'] == 'message':
      return None
    
    message_type = event['message']['type']

    if message_type not in LINE_ROUTES.keys():
      return 'pass'

    return LINE_ROUTES[message_type]
  elif url_type == 's3':
    return AWS_ROUTES[event]