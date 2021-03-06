/* jshint esversion: 6 */

const THEMES = {
  light: {
    text: '#555',
    grid: '#f0f0f0',
    map: {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
    },
    route_map: {
      url: "https://api.mapbox.com/styles/v1/pikislabis/cjgj5g1id00642stj8qovxfpv/tiles/256/{z}/{x}/{y}?access_token=" + window.mapbox_token,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>'
    },
    tooltip: {
      color: '#555'
    },
    table: {
      thead_color: window.primary_color,
      thead_bg: '#ececec',
      tbody_color: '#555',
      tbody_bg: 'transparent',
      border_color: '#f0f0f0'
    }
  },
  dark: {
    text: '#d8d9da',
    grid: '#444343',
    map: {
      url: "https://api.mapbox.com/styles/v1/pikislabis/cjeb0cztza0k32snr6abbjd81/tiles/256/{z}/{x}/{y}?access_token=" + window.mapbox_token,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>'
    },
    route_map: {
      url: "https://api.mapbox.com/styles/v1/pikislabis/cjgj5ota400652spkudo45syp/tiles/256/{z}/{x}/{y}?access_token=" + window.mapbox_token,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>'
    },
    tooltip: {
      color: '#555'
    },
    table: {
      thead_color: window.primary_color,
      thead_bg: '#242222',
      tbody_color: '#d8d9da',
      tbody_bg: '#1f1d1d',
      border_color: '#444343'
    }
  }
};

export default {
  text(theme) {
    return THEMES[theme].text;
  },

  grid(theme) {
    return THEMES[theme].grid;
  },

  map(theme) {
    return THEMES[theme].map;
  },

  route_map(theme) {
    return THEMES[theme].route_map;
  },

  table(theme) {
    return THEMES[theme].table;
  },

  tooltip(theme) {
    return THEMES[theme].tooltip;
  }
};
