import React, { Component ,Suspense} from "react";
import plotly from "plotly.js/dist/plotly.min.js";
import PlotlyEditor from "react-chart-editor";
import "react-chart-editor/lib/react-chart-editor.css";

const config = { editable: true };

class Child extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }
    render(){
    let data=[],layout={};
  return (
        <div>
     <PlotlyEditor
        data={data}
        layout={layout}
        config={config}
        plotly={plotly}
        useResizeHandler
        debug
        advancedTraceTypeSelector
      />
      
    </div>
  );}
}
export default Child;
