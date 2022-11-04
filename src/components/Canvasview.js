import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = [];

export default class CanvasView extends Component {
    constructor() {
        super();
        this.state = { workouts: [] }
    }

    render() {
        const options = {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Calories Burn"
            },
            axisY: {
                title: "Graph",
            },
            data: [{
                type: "column",
                dataPoints: this.state.workouts


            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );

    }

    componentDidMount() {
        console.log(this.state.workouts)
        var chart = this.chart;
        fetch('http://localhost:8000/workouts')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                let formattedData = data.map(d => {
                    return { label: d.title, y: d.TotalCalories }
                }
                )
                console.log(formattedData);
                this.setState({ workouts: formattedData })
                chart.render();
            });
    }
}