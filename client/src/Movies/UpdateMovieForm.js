import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovieForm = () => {
const [ movie, setMovie ] = useState(initialMovie)

    return(
        <div>
            Movie Form Here
        </div>
    )
}

export default UpdateMovieForm;