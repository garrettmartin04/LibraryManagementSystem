The Library Management System is a comprehensive web-based application developed to streamline the essential operations of library management. This project was chosen due to its relevance and applicability to real-world scenarios, where libraries require efficient systems for managing book inventory, members, and loan records. Additionally, this application offers a platform for expanding into more sophisticated functionalities, such as tracking book popularity based on loan patterns. The main components of this project include a structured database to store book, member, and loan information; a robust backend API to handle application logic and data requests; and an interactive frontend interface that allows users to interact seamlessly with the library data.

Basic Functionalities:
Adding, Viewing, Updating, and Deleting Records: The system allows users to add, edit, delete, and view records across all major tables, including books, authors, categories, members, and loans. Each of these CRUD (Create, Read, Update, Delete) operations is implemented via Django REST API endpoints, enabling efficient and secure data management.

Searching and Listing Books and Members: Users can search for specific books by title or author, as well as list all members and their associated loans. This functionality is powered by SQL queries in the backend, optimized with Django’s ORM for better performance.

Complex Queries and Aggregates: The system includes more complex queries, such as aggregating the number of times each book has been loaned, which provides valuable insights into book popularity. Aggregate queries in Django ORM, such as counting the number of loans per book, help generate these metrics, which are displayed in the application interface.

Advanced Functionality:
Book Popularity Analysis: The advanced feature of this system is its ability to analyze and display the popularity of books based on historical loan data. The popularity score is calculated by counting the number of loans each book has received. This score is stored in a popularity_score field in the Book table, which is updated regularly based on loan data. A Django management command (analyze_loans) was created to calculate and store this score. This feature enables library administrators to quickly identify popular books and make informed decisions regarding inventory management.

Implementation Details:
The implementation of this system was achieved using a modern full-stack approach, with Django handling the backend logic and MySQL serving as the primary database. The frontend, developed using React and JavaScript, provides an intuitive user interface that allows seamless interactions with the system’s core functionalities. Python was the language of choice for backend development due to its compatibility with Django and its robust support for database manipulation and data analysis.
![Home](https://github.com/user-attachments/assets/282deb70-53c6-4d87-8e75-a7570044dc4e)
![members](https://github.com/user-attachments/assets/59d8941d-ea70-4dce-9ce3-8ec89b3d1100)
![loans](https://github.com/user-attachments/assets/9430504d-cf51-449b-88a3-7808fc167631)
![Books](https://github.com/user-attachments/assets/526b41c9-06e2-4697-be77-299bcbf01a7b)
