from django.core.management.base import BaseCommand
from library.models import Loan, Book
from django.db.models import Count

class Command(BaseCommand):
    help = 'Analyze loan data to update book popularity scores'

    def handle(self, *args, **kwargs):
        # Count loans for each book
        popular_books = (
            Loan.objects.values('book_id')
            .annotate(loan_count=Count('loan_id'))
            .order_by('-loan_count')
        )

        # Update each book's popularity score
        for book_data in popular_books:
            book = Book.objects.get(book_id=book_data['book_id'])
            book.popularity_score = book_data['loan_count']
            book.save()
            self.stdout.write(f'Updated {book.title}: {book.popularity_score} loans')
        
        self.stdout.write(self.style.SUCCESS('Successfully updated book popularity scores'))
