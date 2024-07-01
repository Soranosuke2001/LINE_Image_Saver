from django.urls import path

from .views import (
  WebhookEvent,
)

app_name = "line_bot"

urlpatterns = [
  path("", WebhookEvent.as_view(), name="webhook_handler"),
]
