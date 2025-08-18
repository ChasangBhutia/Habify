import React from 'react'

const SideMenu = () => {
    return (
        <menu className='bg-white h-screen w-70 p-3'>
            <header>Habify</header>
            <h3>Menu</h3>
            <ul>
                <li>Dashboard</li>
                <li>Task Manager</li>
                <li>Habit Tracker</li>
                <li>ToDo List</li>
                <li>Sticky Notes</li>
            </ul>
            <section>
                <h3>Chats</h3>
            </section>
        </menu>
    )
}

export default SideMenu