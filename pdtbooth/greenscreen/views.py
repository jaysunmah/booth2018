# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from django.conf import settings
import os

class GreenScreenIndex(View):
    template_name = "greenscreen/index.html"
    def get(self, request, *args, **kwargs):
        uuid_path = os.path.join(settings.BASE_DIR,"static", "images", "uuids.txt")
        uuid = "n/a"
        with open(uuid_path, "r") as f:
            for line in f.readlines():
                if "LONGLIVEPDT_" in line:
                    uuid = line[len("LONGLIVEPDT_"):].strip()

        return render(request, self.template_name, {"uuid": uuid})

class EditImgView(View):
    template_name = "greenscreen/edit_img.html"
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {})

    def post(self, request, *args, **kwargs):
        print(request)
        return JsonResponse({"status": "success"})

class GetPhotosAPI(View):
    def get(self, request, *args, **kwargs):
        uuid = request.GET.get('uuid')
        img_dir = os.path.join(settings.BASE_DIR, "static", "images", uuid)
        data = [os.path.join("/static", "images", uuid, f) for f in os.listdir(img_dir)]
        return JsonResponse({"data": data})
