from django.urls import path
from covid import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.index,name='covid_index'),
    path('indianStates/',views.indianStates,name='indianStates'),
    path('createCountryStatus/',views.createCountryStatus,name='createCountryStatus'),
    path('<str:code>/',views.otherCountry,name='otherCountry'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
