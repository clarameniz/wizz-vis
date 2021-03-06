/*jshint esversion: 6 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactHeatmap from '../../vendor/ReactHeatmap';
import gps_utils from './../../utils/gps';
import WidgetImage from './WidgetImage';
import Info from './utils/Info';
import * as common from './../../props';
import get from 'lodash/get';
import Graph from './../../utils/graph';
import castArray from 'lodash/castArray';

export default class WidgetPlane extends React.Component {
  constructor(props) {
    super(props);

    this.image = {
      clientWidth: 0,
      clientHeight: 0,
      naturalWidth: 0,
      naturalHeight: 0
    };

    this.aggregator = '';
    this.coordinate_dimension = '';
  }

  componentDidMount() {
    this.setDimensionAggregator();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.aggregators !== this.props.aggregators ||
      prevProps.dimensions !== this.props.dimensions ||
      prevProps.options.metrics !== this.props.options.metrics){
      this.setDimensionAggregator();
    }
  }

  // We have to wait until the image is loaded to retrieve the real width
  // and real height of the image.
  // The forceUpdate is needed because sometimes the data is caculated before
  // the image is loaded.
  handleImageLoaded() {
    this.forceUpdate();
  }

  setDimensionAggregator() {
    let coordinate_dimension =
      this.props.dimensions.find((e) => (
        /coordinate|latlong|latlng/.test(e.name)
      ));

    this.coordinate_dimension = coordinate_dimension.name;
    this.aggregator = castArray(this.props.options.metrics)[0] || this.props.aggregators[0].name;
  }

  transformData(data) {
    return (
      data.filter((d) => d[this.coordinate_dimension] !== null).map(function(d) {
        let latitude = d[this.coordinate_dimension].split(',')[0];
        let longitude = d[this.coordinate_dimension].split(',')[1];

        let {x, y} = this.translatePoint(latitude, longitude);

        return {
          x,
          y,
          value: d[this.aggregator]
        };
      }, this)
    );
  }

  translatePoint(latitude, longitude) {
    if(this.image.naturalWidth == 0 || this.image.naturalHeight == 0)
      return {x: 0, y: 0};

    const {m_trans, m_offset} =
      gps_utils.latlngToPointMatrices(this.props.options.gps_markers,
                                      this.image.naturalWidth,
                                      this.image.naturalHeight);

    var {x, y} = gps_utils.latlngToPercent(latitude, longitude,
                                           this.image.naturalWidth,
                                           this.image.naturalHeight,
                                           m_trans, m_offset);

    return {x, y};
  }

  getImageURL() {
    return this.props.options.image;
  }

  get gradient() {
    const gradient = {
      0.0: 'lightblue',
      0.4: 'blue',
      0.6: 'cyan',
      0.7: 'lime',
      0.8: 'yellow',
      1.0: 'red'
    };

    return get(this.props, 'options.gradient') || gradient;
  }

  getMax(data) {
    const value_type = get(this.props, 'options.max_value') || 'max';
    const data_length = data.length;

    if (data_length == 0)
      return 0;

    if (value_type === 'average') {
      return data.map(d => d.value).reduce((a,b) => a + b, 0) / data_length;
    } else if (parseFloat(value_type)) {
      return parseFloat(value_type);
    } else {
      return Math.max(...data.map(d => d.value));
    }
  }

  get radius() {
    return get(this.props, 'options.radius') || 40;
  }

  get opacity() {
    return get(this.props, 'options.opacity') || 1;
  }

  showLegend(data_length) {
    if (data_length == 0)
      return false;

    const legend = get(this.props, 'options.legend');
    return legend == undefined ? true : legend;
  }

  render () {
    if(this.props.error)
      return(<Info error={this.props.error} />)

    const data = this.transformData(this.props.data);

    if(this.showLegend(data.length))
      Graph.legend({
        max: parseFloat(this.getMax(data)),
        gradient: this.gradient
      }, '.plane.legend#legend_' + this.props.id, this.props.width);

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <WidgetImage
          width={this.image.clientWidth}
          height={this.image.clientHeight}
          keepRatio={this.props.options.keep_ratio}
          image={this.getImageURL()}
          onLoad={this.handleImageLoaded.bind(this)}
          ref={(node) => node ? this.image = node.image : null}>
          <div style={{width: '100%', height: '100%', opacity: this.opacity}}>
            <ReactHeatmap
              data={data}
              radius={parseFloat(this.radius)}
              max={parseFloat(this.getMax(data))}
            />
          </div>
        </WidgetImage>
      <div className='plane legend' id={ 'legend_' + this.props.id }></div>
      </div>
    )
  }
};

WidgetPlane.propTypes = {
  ...common.BASE,
  aggregators: PropTypes.arrayOf(PropTypes.object).isRequired,
  dimensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.shape({
    ...common.PLANE
  })
};
