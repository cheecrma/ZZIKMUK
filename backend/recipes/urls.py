from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'recipes'

urlpatterns = [
    #path('', views.index, name='index'),
    path('list/<int:id>/', views.RecipeList.as_view()),
    path('detail/', views.RecipeDetailList.as_view()),
    path('step/', views.RecipeStepList.as_view()),
    path('complete/', views.RecipeCompleteList.as_view()),
    path('popular/', views.RecipePopularList.as_view()),
    path('search/r_name/', views.RecipeSearch.as_view()),
    path('search/r_ingr/', views.RecipeSearchByIng.as_view()),
    path('search/ingr/', views.IngredientSearch.as_view()),
    path('tips/<int:id>/', views.TipsInfo.as_view()),
    path('suggestion/', views.RecipeSuggestion.as_view()),
]