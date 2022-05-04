from django.contrib import admin

# Register your models here.

from .models import Beach, Review

class ReviewAdmin(admin.ModelAdmin):
    model = Review
    list_display = ('beach', 'rating', 'comment', 'pub_date')
    list_filter = ['pub_date', 'user_reviewed']
    search_fields = ['comment']
    

'''class ClusterAdmin(admin.ModelAdmin):
    model = Cluster
    list_display = ['name', 'get_members']'''

    
admin.site.register(Beach)
admin.site.register(Review, ReviewAdmin)
#admin.site.register(Cluster, ClusterAdmin)