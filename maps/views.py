from django.shortcuts import render
from beachprofile.models import Beach
from django.core import serializers
import json
beaches = Beach.objects.all()
def home(request):
    data = {}
    beachlist = Beach.objects.all()
    i = 0
    j = 1
    for beach in beachlist:
        rating = beach.average_rating()
        data[str(i)] = {
            'beach': beach.beachname,
            'rating':str(rating)
        }
        data['length'] = j
        i = i + 1
        j = j + 1

    print(data)
    data = json.dumps(data)
    #beaches_data = serializers.serialize("json",Beach.objects.all())    
    context = {
    "beachtest" : data,
    }
    return render(request,'maps/homepage.html',context)
def search(request):
    return render(request, 'maps/search.html')
# Create your views here.
