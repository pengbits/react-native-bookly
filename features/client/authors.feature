Feature: Authors
  I am keeping a list of my favorite authors

  Scenario: List Authors
    Given there are authors in the database
     When I render the AuthorList
     Then there will be a fetch to the server
     When it loads
     Then there will be authors in the list
 
  Scenario: Show Author Details
    Given there are authors in the database
     When I render the AuthorDetails
     Then there will be a fetch to the server
     When it loads
     Then the view will be populated with some Author attributes
 
 Scenario: Search for author by name
   Given the name of a well-known author
    When I enter the author's name in the searchbox
    Then there will be a fetch to the search endpoint
    When it loads
    Then the searchbox will contain an Author result
  
  Scenario: Create an author
    Given I have an author with valid attributes
     When I save the author to the database
     When it loads
     Then my author will be in the list