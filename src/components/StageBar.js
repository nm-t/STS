/* @flow */
import React from 'react';
import NVD3Chart from 'react-nvd3';

const StageBar = ({participants, threshold, totalParticipants}: any): any => {
    const participantNum = parseInt(participants),
          thresholdNum = parseInt(threshold),
          totalNum = parseInt(totalParticipants);

    const stageData = [
        {key: 'Threshold', values: [ { label: "stack", value: thresholdNum }], color: "#FF5252"},
        {key: 'Participants', values: [ { label: "stack", value: participantNum - thresholdNum }], color: "#2196F3"},
        {key: 'Total Participants', values: [ { label: "stack", value: totalNum - (participantNum - thresholdNum) - thresholdNum }], color: "#EEE"}
    ];

    return (
      <div style={{marginLeft: "-3em"}}>
        <NVD3Chart
          type="multiBarHorizontalChart"
          datum={stageData}
          stacked="true"
          interactive={false}
          tooltip={{enabled: false}}
          tooltips={false}
          x="label"
          height="3em"
          showValues={false}
          showXAxis={false}
          showYAxis={false}
          showLegend={false}
          showControls={false}
          showValues={false}
          y="value" />
      </div>
   );
};

export default StageBar;
