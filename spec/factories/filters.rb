FactoryBot.define do
  factory :application_filter, class: Filter do
    association :dimension, factory: :application_dimension
    association :widget, factory: :widget_serie
    operator 'eq'
    value 'http'
  end
end
