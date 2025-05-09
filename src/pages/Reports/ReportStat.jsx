

const ReportStat = () => {
  return (
    <div className=" grid grid-cols-2 shadow">
    <div className="stat">
      <div className="stat-title">Last Mouth Reports</div>
      <div className="stat-value">31</div>
      <div className="stat-desc">Jan 1st - Feb 1st</div>
    </div>

    <div className="stat">
      <div className="stat-title">total Report</div>
      <div className="stat-value">50</div>
      
    </div>

    <div className="stat">
      <div className="stat-title">varified report</div>
      <div className="stat-value">12</div>
     
    </div>
    <div className="stat">
      <div className="stat-title">connected people</div>
      <div className="stat-value">42</div>
      
    </div>
  </div>
  )
}

export default ReportStat