from django.contrib import admin
from library.models import Author, Book, Category, Loan, Member  # Import models

admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Category)
admin.site.register(Loan)
admin.site.register(Member)
