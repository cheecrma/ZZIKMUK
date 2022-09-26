from django.shortcuts import render

from recipes.models import Ingredient

# Create your views here.
def index(request):
    ingre = Ingredient.objects.get(id=100)
    print(ingre.id)
    context = {
        'id': ingre.id,
        'name': ingre.name,
        'score':ingre.score
        }
    return render(request, 'recipes/index.html', context)