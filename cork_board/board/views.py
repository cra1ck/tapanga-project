from cgitb import text
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def post_ball_position(request):
    position = request.POST.get("pos")
    return JsonResponse({'position': position}) 

