import React from 'react';

const AppHeader = () => {
    return (
        <header>
            <h1>React Blog Form</h1>
            <div className="input-group mb-3">
                <div className='d-flex'>
                    <button className="btn" type="button" popovertarget="off-canvas-form">
                        Aggiungi
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
