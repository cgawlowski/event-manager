require "test_helper"

class EventsTest < ActionDispatch::IntegrationTest

  #Routes testing

  test "can get index" do
    get events_path
    assert_response :success
  end

  #Alternative way: an HTTP status code 200 means success
  test 'responds with 200 OK' do
    get '/api/events'
    _(response.status).must_equal 200
  end

  test "returns all events in JSON" do    
    get '/api/events'
  
    json = JSON.parse(response.body)
    _(json.size).must_equal 2
    _(json[0]['event_title']).must_equal 'Festival de Jazz de Montréal'
    _(json[1]['event_title']).must_equal 'Juste pour Rire'
  end
  
  test "can get new" do
    get api_events_url
    assert_response :success
  end

end
