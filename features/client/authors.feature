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