/* @flow */
import React from 'react';
import NVD3Chart from 'react-nvd3';

const StageBar = ({participants, threshold, totalParticipants}: any) => {
    const participantNum = parseInt(participants),
          thresholdNum = parseInt(threshold),
          totalNum = parseInt(totalParticipants);

    const stageData = [
        {key: 'Threshold', values: [ { label: "stack", value: thresholdNum }]},
        {key: 'Participants', values: [ { label: "stack", value: participantNum - thresholdNum }]},
        {key: 'Total Participants', values: [ { label: "stack", value: totalNum - (participantNum - thresholdNum) - thresholdNum }]}
    ];

    return (<NVD3Chart
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
                y="value" />);
};

export default StageBar;
