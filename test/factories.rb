FactoryBot.define do
  factory :event do |f|
      # default attribute values defined here
      event_title { "Best event ever" }
      event_description { "No really this is the best event I've ever been to!" }
      start_date { Time.zone.now+1.day }
      end_date { Time.zone.now+2.day }
  end
end