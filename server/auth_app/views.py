from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.authtoken.models import Token

# Create your views here.
@api_view(['GET', 'POST'])
def login_view(request):
	username = request.data.get('username')
	password = request.data.get('password')
	user = authenticate(request, username=username, password=password)
	if user:
		token = Token.objects.filter(user=user).first()
		return Response(token.key)
	else:
		return Response(False)


@api_view(['GET', 'POST'])
def register_view(request):
	username = request.data.get('username')
	password = request.data.get('password')
	if authenticate(request, username=username, password=password):
		return Response(False)
	else:
		if User.objects.filter(username=username).exists():
			return Response(False)
		else:
			user = User.objects.create_user(username=username, password=password)
			token = Token(user=user)
			token.save()
			return Response(token.key)