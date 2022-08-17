require "application_system_test_case"

class EventsTest < ApplicationSystemTestCase
  test "visiting the homepage" do
    #setup

    #exercise
    visit root_url

    #verify
    assert_selector "h1", text: "Event manager"

    # teardown
  end
end
