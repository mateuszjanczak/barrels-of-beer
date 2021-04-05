import React from "react";
import Chart from "chart.js";

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = [...this.props.data.map(item => item.barrelName)];
        this.myChart.data.datasets[0].data = [...this.props.data.map(item => item.count)];
        this.myChart.update();
    }

    componentDidMount() {
        const labels = [...this.props.data.map(item => item.barrelName + " - " + item.beerType)];

        const data = {
            labels: labels,
            datasets: [{
                label: 'L',
                data: this.props.data.map(item => item.count),
                backgroundColor: "#efa75e",
                borderWidth: 1
            }]
        };

        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            options: {
                animation: false,
                legend: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            display: true
                        },
                        gridLines: {
                            display: true,
                            color: "#000000"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            color: "#000000"
                        },
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 1.5 * Math.max(...this.props.data.map(item => parseInt(item.count)))
                        }
                    }]
                }
            },
            data
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default LineChart;