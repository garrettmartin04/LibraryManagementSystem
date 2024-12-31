from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Author, Book, Category, Loan, Member
from .serializers import (
    AuthorSerializer,
    BookSerializer,
    CategorySerializer,
    LoanSerializer,
    MemberSerializer
)

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.select_related('author', 'category').all()  # Optimized with select_related
    serializer_class = BookSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.select_related('book', 'member').all()  # Optimized with select_related
    serializer_class = LoanSerializer

@api_view(['GET'])
def popular_books(request):
    popular_books = Book.objects.order_by('-popularity_score')[:10]  # Top 10 popular books
    serializer = BookSerializer(popular_books, many=True)
    return Response(serializer.data)