Feature: Authors
  I am keeping a list of my favorite authors
  
Scenario: Get an author
  Given there are authors in the database
  When I fetch the author details
  Then the response will contain some information about the author
  