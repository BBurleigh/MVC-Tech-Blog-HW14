const router = require('express').Router();

const { User, Blog } = require('../../models');

router.get('/', (req, res) => {

    User.findAll({

        attributes: { exclude: ['password'] }

    })
    .then(userData => res.json(userData))

    .catch(err => {

        console.log(err);

        res.status(500).json(err);

    });

});

router.get('/:id', (req, res) => {

    User.findOne({

        attributes: { exclude: ['password'] },

        where: {

            id: req.params.id

        },

        include: [

            {
                
            }

        ]

    })

})