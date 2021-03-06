require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module WizzVis
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    config.active_job.queue_adapter = :sidekiq

    config.eager_load_paths.push(*%W[#{config.root}/lib])
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    Dir["#{Rails.root}/plugins/*/app/assets/**/*"].each do |assets|
      config.assets.paths << assets
    end

    Dir["#{Rails.root}/config/routes_files/**/*.rb"].each do |route_file|
      config.paths['config/routes.rb'] << route_file
    end
  end
end
