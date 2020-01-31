Feature: Authors
  I am keeping a list of my favorite authors
  
Scenario: Get authors
  Given there are authors in the database
   When I fetch the authors endpoint
   Then the response will contain a list of authors

Scenario: Get an author
  Given there are authors in the database
   When I fetch the author details endpoint
   Then the response will contain details about the author
  
Scenario: Create an author
  Given I have an author with valid attributes
   When I save the author to the database
    And I fetch the authors endpoint
   Then my author will be in the list

Scenario: Delete an Author
  Given there are authors in the database
    And I have an author I want to delete
   When I fetch the delete author endpoint
    And I fetch the authors endpoint
   Then my author will not be in the list