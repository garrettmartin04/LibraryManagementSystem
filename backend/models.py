from django.db import models

class Author(models.Model):
    author_id = models.AutoField(primary_key=True, db_column='AuthorID')
    name = models.CharField(max_length=100, db_column='Name')
    biography = models.TextField(blank=True, null=True, db_column='Biography')

    class Meta:
        managed = False  # Django won't manage this table
        db_table = 'authors'

    def __str__(self):
        return self.name

class Category(models.Model):
    category_id = models.AutoField(primary_key=True, db_column='CategoryID')
    name = models.CharField(max_length=50, db_column='CategoryName')  # Corrected db_column

    class Meta:
        managed = False
        db_table = 'categories'

    def __str__(self):
        return self.name

class Book(models.Model):
    book_id = models.AutoField(primary_key=True, db_column='BookID')  # Maps to 'BookID'
    title = models.CharField(max_length=200, db_column='Title')
    popularity_score = models.IntegerField(default=0)
    author = models.ForeignKey(
        Author,
        db_column='AuthorID',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    category = models.ForeignKey(
        Category,
        db_column='CategoryID',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    isbn = models.CharField(unique=True, max_length=20, blank=True, null=True, db_column='ISBN')
    publication_year = models.IntegerField(
        blank=True,
        null=True,
        db_column='PublicationYear'
    )
    copies_available = models.IntegerField(default=1, blank=True, null=True, db_column='CopiesAvailable')

    class Meta:
        managed = False
        db_table = 'books'

    def __str__(self):
        return self.title

class Member(models.Model):
    member_id = models.AutoField(primary_key=True, db_column='MemberID')
    name = models.CharField(max_length=100, db_column='Name')
    address = models.CharField(max_length=255, blank=True, null=True, db_column='Address')
    email = models.CharField(max_length=100, unique=True, blank=True, null=True, db_column='Email')
    phone_number = models.CharField(max_length=20, blank=True, null=True, db_column='PhoneNumber')
    membership_date = models.DateField(blank=True, null=True, db_column='MembershipDate')

    class Meta:
        managed = False
        db_table = 'members'

    def __str__(self):
        return self.name

class Loan(models.Model):
    loan_id = models.AutoField(primary_key=True, db_column='LoanID')
    book = models.ForeignKey(
        Book,
        db_column='BookID',
        on_delete=models.CASCADE
    )
    member = models.ForeignKey(
        Member,
        db_column='MemberID',
        on_delete=models.CASCADE
    )
    loan_date = models.DateField(db_column='LoanDate')
    due_date = models.DateField(db_column='DueDate')
    return_date = models.DateField(blank=True, null=True, db_column='ReturnDate')

    class Meta:
        managed = False
        db_table = 'loans'

    def __str__(self):
        return f"Loan {self.loan_id} - {self.book.title}"