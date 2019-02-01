var router = require('express').Router()
var Movie = require('../db').import('../models/movie');
require('./user-controller')

/** Add Movie **/

router.post('/', (req, res) => {
    Movie.create({
        movie_id: req.body.movie.movie_id,
        owner_id: req.user.id,
        // owner_id: req.body.movie.owner_id,
        title: req.body.movie.title,
        comment: req.body.movie.comment
    })
      .then(movie => res.status(200).json({
        movie: movie,
        message: "Movie added."
        })
      )
      .catch(err => console.log(err))
})

/** Get ALL of User's Movies **/

router.get('/', (req, res) => {
    Movie.findAll({ where: { owner_id: req.user.id } })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
})

/** Update Movie **/

router.put('/:id', (req, res) => {
    Movie.update({
        comment: req.body.movie.comment
    },
    {
      where: {
          id: req.params.id,
          owner_id: req.user.id
      }
    })
      .then(movie => res.status(200).json({
              movie: movie,
              message: "Successfully updated."
          })
      )
      .catch(err => {
        console.log('got error', err);
        res.status(500).json({error: err})
      })
})

/** Delete Movie **/

router.delete('/:id', (req, res) => {
    Movie.destroy({
      where: {
        id: req.params.id,
        owner_id: req.user.id
      }
    })
      .then(movie => res.status(200).json({
              movie: movie,
              message: "Successfully deleted"
          })
      )
  
      .catch(err => res.status(500).json({error: err}))
  })
  
  module.exports = router;