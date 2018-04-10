from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'get_photos_uuid', views.GetPhotosAPI.as_view(), name='get_photos_api'),
    url('step2', views.EditImgView.as_view(), name='step2'),
    url('', views.GreenScreenIndex.as_view(), name='index'),
]
