require "test_helper"

class EventTest < ActiveSupport::TestCase
  test "visiting the homepage" do
    #setup
    #exercise
    visit root_url

    #verify
    assert_selector "h1", text: "Event manager"
  end
end
