Feature: Books
  I am keeping a list of my favorite Books
  
Scenario: Get Books
  Given there are books in the database
   When I fetch the books endpoint
   Then the response will contain a list of books

Scenario: Get a Book
  Given there are books in the database
   When I fetch the book details endpoint
   Then the response will contain details about the book

Scenario: Create a Book
  Given I have a book with valid attributes
   When I save the book to the database
    And I fetch the books endpoint
   Then my book will be in the list

# Scenario: Delete a Book
#   Given there are books in the database
#     And I have a book I want to delete
#    When I fetch the delete book endpoint
#     And I fetch the books endpoint
#    Then my book will not be in the list