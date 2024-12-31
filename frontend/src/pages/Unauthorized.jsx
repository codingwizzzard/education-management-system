import React from 'react'

const Unauthorized = () => {
  return (
    <>
      <div className="card">
        <div className="card-body text-center">
          <h1 className="text-danger mb-4">Unauthorized Access</h1>
          <p className="lead">
            Sorry, you don't have permission to access this page.
          </p>
          <p>
            Please contact your administrator if you believe this is a mistake.
          </p>
        </div>
      </div>
    </>
  )
}

export default Unauthorized