from rest_framework import serializers

from .models import (
  LineImage,
  LineVideo,
)


class LineImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = LineImage
    fields = [
      "image_url",
      "content_provider",
      "source_type",
      "reply_token",
      "is_redelivery",
      "user_id",
      "webhook_event_id",
      "timestamp",
    ]


class LineVideoSerializer(serializers.ModelSerializer):
  class Meta:
    model = LineVideo
    fields = [
      "video_url",
      "preview_image_url",
      "duration_ms",
      "content_provider",
      "source_type",
      "reply_token",
      "is_redelivery",
      "user_id",
      "webhook_event_id",
      "timestamp",
    ]    