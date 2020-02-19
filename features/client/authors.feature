Feature: Authors
  I am keeping a list of my favorite authors

  Scenario: AuthorList
    Given there are authors in the database
     When I render the AuthorList
     Then there will be a fetch to the server
     When it loads
     Then there will be authors in the list
 
  Scenario: AuthorDetails
    Given there are authors in the database
     When I render the AuthorDetails
     Then there will be a fetch to the server
     When it loads
     Then the view will be populated with some Author attributes
 
 Scenario: Find an author by name 
   Given the name of a well-known author
    When I enter the author's name in the searchbox
    Then there will be a fetch to the search endpoint
    When it loads
    Then the searchbox will contain an Author result