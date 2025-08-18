import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between px-3 bg-white h-[15vh] items-center'>
            <aside>
                <h1 className='text-[20px]'>Task Manager</h1>
                <section>
                    <button>Chasang</button>
                    <img src="" alt="" />
                </section>

            </aside>
            <aside>
                <section className='flex items-center gap-2 text-[15px]'>
                    <h2 className='bg-zinc-100 rounded-full py-1 px-2 text-[15px]'>14</h2>
                    <span>
                        <h2>Thursday</h2>
                        <h2>December</h2>
                    </span>
                </section>
                <button>Create Task</button>
            </aside>
        </nav>
    )
}

export default Navbar