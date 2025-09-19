
import ReportBarChart from "../Reports/Charts/ReportBarChart"


const ReportAnalysis = () => {
  return (
    <div>
<div className="  p-5 flex flex-col gap-5"> {/* Ensure column layout */}
        <h1 className="text-3xl font-bold text-red-500">Area Crime Report</h1>
    
        <div>
       
         <ReportBarChart></ReportBarChart>
        </div>
      
       </div>
    


        
    </div>
  )
}

export default ReportAnalysis