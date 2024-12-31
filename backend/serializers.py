from rest_framework import serializers
from .models import Author, Book, Category, Loan, Member

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['author_id', 'name', 'biography']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'name']

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Book
        fields = [
            'book_id',
            'title',
            'author',
            'category',
            'author_id',
            'category_id',
            'isbn',
            'publication_year',
            'copies_available',
            'popularity_score'
        ]

    def create(self, validated_data):
        author_id = validated_data.pop('author_id')
        category_id = validated_data.pop('category_id')
        try:
            author = Author.objects.get(author_id=author_id)
            category = Category.objects.get(category_id=category_id)
        except Author.DoesNotExist:
            raise serializers.ValidationError({'author_id': 'Invalid author_id'})
        except Category.DoesNotExist:
            raise serializers.ValidationError({'category_id': 'Invalid category_id'})
        book = Book.objects.create(author=author, category=category, **validated_data)
        return book

    def update(self, instance, validated_data):
        author_id = validated_data.pop('author_id', None)
        category_id = validated_data.pop('category_id', None)

        if author_id:
            try:
                author = Author.objects.get(author_id=author_id)
                instance.author = author
            except Author.DoesNotExist:
                raise serializers.ValidationError({'author_id': 'Invalid author_id'})

        if category_id:
            try:
                category = Category.objects.get(category_id=category_id)
                instance.category = category
            except Category.DoesNotExist:
                raise serializers.ValidationError({'category_id': 'Invalid category_id'})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['member_id', 'name', 'address', 'email', 'phone_number', 'membership_date']

class LoanSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    member = MemberSerializer(read_only=True)
    book_id = serializers.IntegerField(write_only=True)
    member_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Loan
        fields = [
            'loan_id',
            'book',
            'member',
            'book_id',
            'member_id',
            'loan_date',
            'due_date',
            'return_date'
        ]

    def create(self, validated_data):
        book_id = validated_data.pop('book_id')
        member_id = validated_data.pop('member_id')
        try:
            book = Book.objects.get(book_id=book_id)
            member = Member.objects.get(member_id=member_id)
        except Book.DoesNotExist:
            raise serializers.ValidationError({'book_id': 'Invalid book_id'})
        except Member.DoesNotExist:
            raise serializers.ValidationError({'member_id': 'Invalid member_id'})
        loan = Loan.objects.create(book=book, member=member, **validated_data)
        return loan

    def update(self, instance, validated_data):
        book_id = validated_data.pop('book_id', None)
        member_id = validated_data.pop('member_id', None)

        if book_id:
            try:
                book = Book.objects.get(book_id=book_id)
                instance.book = book
            except Book.DoesNotExist:
                raise serializers.ValidationError({'book_id': 'Invalid book_id'})

        if member_id:
            try:
                member = Member.objects.get(member_id=member_id)
                instance.member = member
            except Member.DoesNotExist:
                raise serializers.ValidationError({'member_id': 'Invalid member_id'})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance