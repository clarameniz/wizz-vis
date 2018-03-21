module DashboardsHelper
  def reload_intervals
    [
      ['30s', 30],
      ['1m',  60],
      ['5m',  300],
      ['15m', 900],
      ['30m', 1800],
      ['1h',  3600],
      ['2h',  7200]
    ]
  end
end
