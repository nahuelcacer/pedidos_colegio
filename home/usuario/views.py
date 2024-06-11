from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django.contrib.auth import login
from home.context_processors import urls_context
# Create your views here.



class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        login(request, user)
        return Response({
            'user':user.username,
            'token':token.key
        })
    
    def get(self, request):
            user = request.user
            urls = urls_context(request)
            print(urls)
            if user.is_authenticated:
                return Response({
                    'user':user.username,
                    'email':user.email,
                    'urls':urls
                })
            else:
                return Response({
                    'msg': "Redireccionar a login view"
                })