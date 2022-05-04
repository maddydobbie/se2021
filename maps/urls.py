from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name='maps-home'),
    path('search',views.search, name='maps-search')
]
