import React from "react"

// TODO: Agregar datos dummy en las cards

const Dashboard: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-blue-600 text-white py-4 shadow-md'>
        <div className='container mx-auto px-4'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
        </div>
      </header>
      <main className='container mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold mb-2'>1</h2>
            <p className='text-gray-600'>lorem ipsum</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold mb-2'>2</h2>
            <p className='text-gray-600'>lorem ipsum</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold mb-2'>3</h2>
            <p className='text-gray-600'>lorem ipsum</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
