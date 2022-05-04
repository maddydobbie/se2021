"""beachseng2021 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from django.contrib.auth import views as auth_views
from users import views as user_views
from beachprofile import views as beach_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('maps.urls')),
    url(r'^register/', user_views.register, name='register'),
    url(r'^profile/', user_views.profile, name='profile'),
    url(r'^login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),

    url(r'^review_list/', beach_views.review_list, name='review_list'),
    url(r'^(?P<id>\d+)/user_review_list/', beach_views.user_review_list, name='user_review_list'),

    url(r'^logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
    url(r'beachProfile/', beach_views.beachProfile, name='beachProfile'),
    url(r'(?P<id>\d+)/fav/$', beach_views.fav, name="fav"),
    url(r'(?P<id>\d+)/add_review/', beach_views.add_review, name='add_review'),
	url(r'direction/', beach_views.direction, name='direction'),
    url(r'(?P<id>\d+)/delete_review/', beach_views.delete_review, name='delete_review'),
    
]
