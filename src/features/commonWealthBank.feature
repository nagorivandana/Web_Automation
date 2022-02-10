Feature: Common Wealth Bank Tabs Check
    As a user
    I should be able to login to teams


    Background: Launch common wealth bank portal
        Given I open the site "/"
        Given I am on page "CommonPage"


    Scenario Outline: Verifying exisiting tabs
        Given I am on page "CommonPage"
        When I click on the element "<tabName>"
        Then I expect that element "bannerDetails" contains the text "<bannerDetails>"


        Examples:
            | tabName          | bannerDetails                     |
            | bankingTab       | Banking                           |
            | homeloanTab      | Home loans                        |
            | insuranceTab     | Insurance                         |
            | investingTab     | Investing & Super                 |
            | businessTab      | Business banking                  |
            | institutionalTab | Institutional banking and markets |





