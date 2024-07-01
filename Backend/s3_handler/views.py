import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

import boto3

from .serializers import (
  S3LineImageSerializer,
)

from .models import (
  S3LineImage,
)

from .helpers import (
  construct_filtered_data,
  fetch_binary_data,
  binary_image_convert,
  s3_upload
)

s3 = boto3.client('s3')


# Create your views here.
class S3ImageUploadEvent(APIView):
  def post(self, request, format=None):
    filtered_data, image_id, object_path = construct_filtered_data(request.data, 'image')

    # save the image details to the model
    serializer = S3LineImageSerializer(data=filtered_data)

    if not serializer.is_valid():
      return Response(status=status.HTTP_400_BAD_REQUEST)
    
    serializer.save()

    # fetch the image from line data api
    response = fetch_binary_data(image_id)

    if not response:
      return Response(status=status.HTTP_401_UNAUTHORIZED)

    # convert the binary data to image
    image = binary_image_convert(response.content)
    
    # upload the image to the s3 bucket
    s3_upload_state = s3_upload(s3, image, object_path, 'image')

    if not s3_upload_state:
      return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK)
  
  
  def delete(self, request, *args, **kwargs):
    S3LineImage.objects.all().delete()
    return Response(status=status.HTTP_204_NO_CONTENT)