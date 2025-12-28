@tiny @tiny_persistentresize
Feature: Basic tests for Persistent resize

  @javascript
  Scenario: Plugin tiny_persistentresize appears in the list of installed additional plugins
    Given I log in as "admin"
    When I navigate to "Plugins > Plugins overview" in site administration
    And I follow "Additional plugins"
    Then I should see "Persistent resize"
    And I should see "tiny_persistentresize"
