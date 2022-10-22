class Event < ApplicationRecord
  validates :event_title, presence: true,
  length: {maximum: 32}
end
