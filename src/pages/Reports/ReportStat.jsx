

const ReportStat = () => {
  return (
    <div className=" grid grid-cols-2 shadow">
    <div className="stat">
      <div className="stat-title">Last Mouth Reports</div>
      <div className="stat-value">31</div>
      <div className="stat-desc">Jan 1st - Feb 1st</div>
    </div>

    <div className="stat">
      <div className="stat-title">increase Crime</div>
      <div className="stat-value">0</div>
      <div className="stat-desc">↗︎  (0%) </div>
    </div>

    <div className="stat">
      <div className="stat-title">Total Reports</div>
      <div className="stat-value">1,200</div>
      <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
    <div className="stat">
      <div className="stat-title">Decrese Crime</div>
      <div className="stat-value">42</div>
      <div className="stat-desc">↗︎  (22%) </div>
    </div>
  </div>
  )
}

export default ReportStat