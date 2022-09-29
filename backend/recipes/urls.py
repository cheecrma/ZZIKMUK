from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'recipes'

urlpatterns = [
    #path('', views.index, name='index'),
    #path('ingredientall/', views.IngredientInfo.as_view()),
    #path('<int:id>/', views.RecipeInfo.as_view()),
    # path('detail/<int:rid>/<int:rstep>/', views.RecipeDetailInfo.as_view()),
    #path('detail/', views.RecipeDetailInfo.as_view()),
    #path('ingredient/', views.RecipeIngredientInfo.as_view()),
    path('tips/<int:id>/', views.TipsInfo.as_view()),

    path('list/<int:id>/', views.RecipeList.as_view()),
    path('detail/', views.RecipeDetailList.as_view()),
]