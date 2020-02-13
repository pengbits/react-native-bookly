Feature: Authors
  I am keeping a list of my favorite authors

Scenario: AuthorList
  Given there are authors in the database
   When I render the AuthorList
    And it loads
   Then there will be authors in the list
