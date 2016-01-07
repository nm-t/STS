import React from 'react';
import NVD3Chart from 'react-nvd3';

const StageBar = ({participants, threshold, totalParticipants}) => {
    const participantNum = parseInt(participants),
          thresholdNum = parseInt(threshold),
          totalNum = parseInt(totalParticipants);

    const stageData = [
        {key: 'Threshold', values: [ { label: "stack", value: thresholdNum }]},
        {key: 'Participants', values: [ { label: "stack", value: participantNum - thresholdNum }]},
        {key: 'Total Participants', values: [ { label: "stack", value: totalNum - participantNum }]}
    ];

    return (<div style={{
                    transform: "translate3d(-35px, -35px, 0) scale(1)",
                    WebkitTransform: "translate3d(-35px, -35px, 0) scale(1)"
    }}>
        <NVD3Chart
               id="barChart"
               type="multiBarHorizontalChart"
               datum={stageData}
               stacked="true"
               x="label"
               height="30px"
               showValues={false}
               showXAxis={false}
               showYAxis={false}
               showLegend={false}
               showControls={false}
                y="value" />
        </div>);
};

export default StageBar;
