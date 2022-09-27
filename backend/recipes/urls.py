from django.urls import path
from . import views

app_name = 'recipes'

urlpatterns = [
    path('', views.index, name='index'),
    #path('ingredientall/<int:pk>/', views.IngredientInfo.as_view()),
    path('<int:id>/', views.RecipeInfo.as_view()),
    path('detail/<int:rid>/<int:rstep>/', views.RecipeDetailInfo.as_view()),
    path('ingredient/<int:no>/', views.RecipeIngredientInfo.as_view()),
]
