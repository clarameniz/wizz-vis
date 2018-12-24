crumb :root do
  link "<span class='breadcrumb'><i class='material-icons'>home</i></span>".html_safe,
       root_path
end

# Dashboards
crumb :dashboards do
  link 'Dashboards', dashboards_path
end

crumb :dashboard do |dashboard|
  link dashboard.name, dashboard
end

crumb :new_dashboard do |dashboard|
  link 'New', dashboard
end

crumb :edit_dashboard do |dashboard|
  link dashboard.name, dashboard
  link "Edit", dashboard
end

# crumb :projects do
#   link "Projects", projects_path
# end

# crumb :project do |project|
#   link project.name, project_path(project)
#   parent :projects
# end

# crumb :project_issues do |project|
#   link "Issues", project_issues_path(project)
#   parent :project, project
# end

# crumb :issue do |issue|
#   link issue.title, issue_path(issue)
#   parent :project_issues, issue.project
# end

# If you want to split your breadcrumbs configuration over multiple files, you
# can create a folder named `config/breadcrumbs` and put your configuration
# files there. All *.rb files (e.g. `frontend.rb` or `products.rb`) in that
# folder are loaded and reloaded automatically when you change them, just like
# this file (`config/breadcrumbs.rb`).
