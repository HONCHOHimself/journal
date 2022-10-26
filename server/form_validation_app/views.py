from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
@api_view(['GET', 'POST'])
def check_username(request):
	username = request.data.get('username')
	if User.objects.filter(username=username).exists():
		return Response(True)
	else:
		return Response(False)