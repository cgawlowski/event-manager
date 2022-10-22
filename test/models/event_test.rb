require "test_helper"

class EventTest < ActiveSupport::TestCase  
  
  #Factory testing
  test "pass if valid factory" do
    event = FactoryBot.build :event
    assert event.valid?
  end
  
  #Unit testing of the Event model
  
  test 'pass if items are correctly saved' do
    event = FactoryBot.build :event
    assert event.save, "The new event is not saved"
  end

  test "pass if item is not valid without a name" do
    event = FactoryBot.build :event
    event.event_title = ""
    refute event.valid?
  end

  test "pass if item cannot be saved without a name" do
    event = FactoryBot.build :event
    event.event_title = nil
    assert !event.save, "Saved the event without a title"
  end

  test "pass if item can be created without a description" do
    event = FactoryBot.build :event
    event.event_description = nil
    assert event.valid?
  end

  test "test invalid if name is more than 32 characters" do
    event = FactoryBot.build :event
    event.event_title = "a way too long name, like a very very very long name for that event"
    assert_not event.valid?, "Event is valid"
  end

  test "can't be saved if name is more than 32 characters" do
    event = FactoryBot.build :event
    event.event_title = "a very very very long name for that event"
    assert !event.save, "Event has been saved"
  end
end