import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const Collaborators = ({ collaborators, setIsOpen }) => {
    return (
        <div className='h-1/2 bg-gray-700 text-white rounded p-3'>
            <header className='flex items-center justify-between mb-3 shadow-xl p-2'>
                <h2 className='poppins text-yellow-300'>Collaorators</h2>
                <button className='flex items-center bg-blue-500 text-white rounded hover:scale-[1.2]' onClick={()=>setIsOpen(true)}><AddIcon/></button>
            </header>
            <div className='overflow-y-auto h-[80%] p-2'>
                {collaborators?.length > 0 ? (
                    collaborators.map(c => (
                        <div key={c._id} className='flex items-center mb-3 bg-zinc-100 p-2 rounded'>
                            <img className='h-8 w-8 rounded-full' src={c.image} alt={c.fullname} />
                            <span className='ml-2'>{c.fullname}</span>
                            <span className='ml-auto bg-green-500 text-white px-2 py-1 rounded text-sm'>Online</span>
                        </div>
                ))) : (
                    <p style={{fontFamily:"Poppins"}} className='text-xl text-center'>No collaborators</p>
                )}

            </div>
        </div>
    )
}

export default Collaborators