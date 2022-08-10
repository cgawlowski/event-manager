class AddNewAttributesToEvent < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :event_type, :event_title
    rename_column :events, :title, :event_description

    remove_column :events, :speaker
    remove_column :events, :host
    remove_column :events, :published
    remove_column :events, :event_date

    add_column :events, :start_date, :datetime
    add_column :events, :end_date, :datetime

  end
end
