from django.urls import path

from .views import (
  WebhookEvent,
  LineImageEvent,
)

app_name = "line_bot"

urlpatterns = [
  path("", WebhookEvent.as_view(), name="webhook_handler"),
  path("submit/image/", LineImageEvent.as_view(), name="image_handler"),
]
