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
  construct_image_data,
  construct_video_data,
  construct_audio_data,
  construct_file_data,
)

from .models import (
  LineImage,
  LineVideo,
  LineAudio,
  LineFile,
)

from .serializers import (
  LineImageSerializer,
  LineVideoSerializer,
  LineAudioSerializer,
  LineFileSerializer,
)

CHANNEL_SECRET = os.getenv('LINE_CHANNEL_SECRET', None)

if CHANNEL_SECRET is None:
  raise ValueError("The LINE_CHANNEL_SECRET value is not set")

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
  

@method_decorator(csrf_exempt, name='dispatch')
class LineImageEvent(APIView):
  def post(self, request, format=None):
    filtered_data = construct_image_data(request.data)

    serializer = LineImageSerializer(data=filtered_data)

    if serializer.is_valid():
      serializer.save()

      # send post request to s3_handler app
      url = construct_url('s3', request.data['message']['type'])

      if not url:
        return Response(status=status.HTTP_404_NOT_FOUND)

      response = forward_request(reverse(url), filtered_data)

      if response.status_code == 200:
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, *args, **kwargs):
    LineImage.objects.all().delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  

@method_decorator(csrf_exempt, name='dispatch')
class LineVideoEvent(APIView):
  def post(self, request, format=None):
    filtered_data = construct_video_data(request.data)

    serializer = LineVideoSerializer(data=filtered_data)

    if serializer.is_valid():
      serializer.save()

      # send post request to s3_handler app
      url = construct_url('s3', request.data['message']['type'])

      if not url:
        return Response(status=status.HTTP_404_NOT_FOUND)
      
      response = forward_request(reverse(url), filtered_data)

      if response.status_code == 200:
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, *args, **kwargs):
    LineVideo.objects.all().delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  

@method_decorator(csrf_exempt, name='dispatch')
class LineAudioEvent(APIView):
  def post(self, request, format=None):
    filtered_data = construct_audio_data(request.data)

    serializer = LineAudioSerializer(data=filtered_data)

    if serializer.is_valid():
      serializer.save()

      # send post request to s3_handler app
      url = construct_url('s3', request.data['message']['type'])

      if not url:
        return Response(status=status.HTTP_404_NOT_FOUND)

      response = forward_request(reverse(url), filtered_data)

      if response.status_code == 200:
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, *args, **kwargs):
    LineAudio.objects.all().delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@method_decorator(csrf_exempt, name='dispatch')
class LineFileEvent(APIView):
  def post(self, request, format=None):
    filtered_data = construct_file_data(request.data)

    serializer = LineFileSerializer(data=filtered_data)

    if serializer.is_valid():
      serializer.save()

      # send post request to s3_handler app
      url = construct_url('s3', request.data['message']['type'])

      if not url:
        return Response(status=status.HTTP_404_NOT_FOUND)

      response = forward_request(reverse(url), filtered_data)

      if response.status_code == 200:
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)


  def delete(self, request, *args, **kwargs):
    LineFile.objects.all().delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


class LineImageFetchEvent(APIView):
  def get(self, request, format=None):
    # Add some verification step
    # ...

    uploaded_images = LineImage.objects.all()

    serializer = LineImageSerializer(uploaded_images, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class LineVideoFetchEvent(APIView):
  def get(self, request, format=None):
    # Add some verification step
    # ...
    uploaded_videos = LineVideo.objects.all()

    serializer = LineVideoSerializer(uploaded_videos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class LineAudioFetchEvent(APIView):
  def get(self, request, format=None):
    # Add some verification step
    # ...
    
    uploaded_audios = LineAudio.objects.all()

    serializer = LineAudioSerializer(uploaded_audios, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class LineFileFetchEvent(APIView):
  def get(self, request, format=None):
    # Add some verification step
    # ...

    uploaded_files = LineFile.objects.all()

    serializer = LineFileSerializer(uploaded_files, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  