import React, { useState, useEffect } from 'react';

function AppMain() {
    const [postData, setPostData] = useState([])
    const [newPost, setNewPost] = useState({
        title: '',
        image: '',
        content: '',
        tags: '',
        published: false,
    });

    function fetchData(url = 'http://localhost:3000/posts') {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                setPostData(data.data);
            })

            .catch(error => {
                console.error('Errore nel recuperare i post', error);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);


    const addPost = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then((response) => response.json())
            .then((data) => {
                setPostData([...postData, data.data]);
                setNewPost({
                    title: '',
                    image: '',
                    content: '',
                    tags: '',
                    published: false,
                });
            })
            .catch((error) => {
                console.error('Errore nell\'aggiungere il post', error);
            });
    };

    const handleDelete = (index) => {

        fetch(`http://localhost:3000/posts/${postData[index].id}`, {
            method: 'DELETE',
        })
            .then(() => {

                setPostData(postData.filter((_, i) => i !== index));
            })
            .catch((error) => {
                console.error('Errore nell\'eliminare il post', error);
            });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPost((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <main>
            <div id="off-canvas-form" popover="true">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Aggiungi un nuovo post</h3>
                    <button className="btn" type="button" popovertarget="off-canvas-form" popovertargetaction="hide">
                        Chiudi
                    </button>
                </div>
                <form className='m-3' onSubmit={addPost}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><strong>Titolo</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="title"
                            aria-describedby="titlehelper"
                            placeholder="Inserisci il titolo del nuovo post"
                            value={newPost.title}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label"><strong>Immagine</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            name="image"
                            id="image"
                            aria-describedby="imagehelper"
                            placeholder="./images/image.jpg"
                            value={newPost.image}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <select
                            className="form-select form-select-lg"
                            name="tags"
                            id="tags"
                            placeholder="Inserisci i tag del nuovo post"
                            value={newPost.tags}
                            onChange={handleChange}
                        >
                            <option value="html">{newPost.tags}</option>

                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label"><strong>Contenuto</strong></label>
                        <textarea
                            className="form-control"
                            name="content"
                            id="content"
                            rows="5"
                            placeholder='Inserisci il contenuto del nuovo post'
                            value={newPost.content}
                            onChange={handleChange} />
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="published"><strong>Pubblicato</strong></label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="published"
                            id="published"
                            value={newPost.published}
                            onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn">
                        Invia
                    </button>
                </form>
            </div>

            <ul className="list-group">

                {postData.length ? postData.map((post, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between postCard">
                        <div>
                            <img src={`http://localhost:3000/imgs/posts/${post.image}`} alt={post.title} />
                            <h5>{post.title}</h5>
                            <p>{post.content}</p>
                            <hr />
                            <p><strong>Tags: </strong>{post.tags && post.tags.length ? post.tags.join(', ') : 'Nessun tag'}</p>

                        </div>
                        <div>
                            <button className="btn trash" onClick={() => handleDelete(index)}>
                                <i className="bi bi-trash"> </i>
                            </button>
                        </div>
                    </li>
                )) : <p>None</p>}
            </ul>
        </main>
    );
};

export default AppMain;
