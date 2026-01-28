from django.shortcuts import render
from django.http import JsonResponse
from .models import Task
import json


def index(request):
    tasks = Task.objects.all().order_by('-created_at')
    return render(request, 'tasks/index.html', {'tasks': tasks})


def add_task(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        task = Task.objects.create(title=data['title'])
        return JsonResponse({'id': task.id, 'title': task.title})


def delete_task(request, task_id):
    Task.objects.filter(id=task_id).delete()
    return JsonResponse({'status': 'deleted', 'task_id': task_id})


def toggle_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.completed = not task.completed
    task.save()
    return JsonResponse({'status': 'updated'})
