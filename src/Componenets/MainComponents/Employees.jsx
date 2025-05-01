import React from 'react'

const Employees = ({loading , employees}) => {
  return (
    <div>
              {loading? (
                <div className="spinner-container">
                <div className="spinner"></div>
              </div> 
                ):(
                  <div className="employee-container">
                  {employees.map((employee, index) => (
                    <div key={employee.employeeCode || index} className="employee-card">
                      <h3 className="employee-name">{employee.user}</h3>
                      <p className="employee-detail"><strong>Email:</strong> {employee.email}</p>
                      <p className="employee-detail"><strong>Role:</strong> {employee.role}</p>
                      <p className="employee-detail"><strong>Employee Code:</strong> {employee.employeeCode}</p>
                    </div>
                  ))}
                </div>
                )
              }
            </div>
  )
}

export default Employees
