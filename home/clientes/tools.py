import json
from django.http import JsonResponse

def destructureResponse(request):
    if not request.method == 'POST':
        return JsonResponse({"status": "error", "message": "Only POST requests are allowed"}, status=405)

    try:
        data = json.loads(request.body)
        if not data:
            return JsonResponse({"status": "error", "message": "Empty request body"}, status=400)
        return data
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
