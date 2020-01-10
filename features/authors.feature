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
  