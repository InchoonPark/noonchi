'use strict'

const Chance = require('chance')
const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const _ = require('underscore')

const PORT = process.env.PORT || 8000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

let games = {}

const animals = ['aardvark', 'alligator', 'anaconda', 'ant', 'anteater', 'antelope',
'ape', 'armadillo', 'baboon', 'badger', 'bass', 'bat', 'bear', 'beaver', 'bee',
'beetle', 'bird', 'bison', 'boar', 'bonobo', 'bug', 'butterfly', 'camel', 'caribou',
'carp', 'cat', 'caterpillar', 'catfish', 'centipede', 'chameleon', 'cheetah', 'chicken',
'chimpanzee', 'chipmunk', 'clownfish', 'cobra', 'cockroach', 'cow', 'crab', 'cricket',
'crocodile', 'deer', 'dinosaur', 'dog', 'dolphin', 'donkey', 'dove', 'dragon', 'duck',
'eagle', 'eel', 'elephant', 'emu', 'falcon', 'ferret', 'fish', 'flamingo', 'fly', 'fox',
'frog', 'giraffe', 'goat', 'goldfish', 'goose', 'gorilla', 'hedgehog', 'hippo', 'horse',
'kangaroo', 'koala', 'ladybug', 'lion', 'lizard', 'llama', 'lobster', 'monkey', 'mouse',
'narwhal', 'octopus', 'ostrich', 'owl', 'panda', 'parrot', 'penguin', 'pig', 'pony',
'rabbit', 'rhino', 'scorpion', 'shark', 'shrimp', 'snail', 'snake', 'starfish', 'tiger',
'tortoise', 'turkey', 'turtle']

const foods = ['asparagus', 'apple', 'avocado', 'beef', 'bean', 'broccoli', 'bacon',
'biscuit', 'bread', 'bagel', 'burrito', 'banana', 'bologna', 'blackberry', 'blueberry',
'brownie', 'corn', 'carrot', 'cracker', 'cookie', 'cucumber', 'corndog', 'cake',
'coconut', 'crepe', 'candy', 'croissant', 'cake', 'chips', 'cheese', 'chili', 'cereal',
'churro', 'duck', 'donut', 'egg', 'eggplant', 'eggroll', 'fries', 'fruit', 'gravy',
'grapes', 'guacamole', 'ham', 'hamburger', 'honey', 'ice', 'juice', 'jelly', 'jam',
'jerky', 'lettuce', 'lasagna', 'lemon', 'lime', 'lobster', 'lamb', 'macaroni', 'mushroom',
'melon', 'noodles', 'nachos', 'onion', 'orange', 'oatmeal', 'pasta', 'pickle', 'potato',
'pumpkin', 'pepper', 'pork', 'popcorn', 'pie', 'peanut', 'pizza', 'peach', 'pear',
'pancake', 'pineapple', 'pretzel', 'pepperoni', 'rice', 'ravioli', 'ramen', 'sushi', 'sausage',
'strawberry', 'shrimp', 'tomato', 'turkey', 'torilla', 'waffle', 'yam', 'yogurt']

const householdItems = ['alarm', 'backpack', 'bed', 'binder', 'blanket', 'bookcase',
'broom', 'brush', 'bucket', 'calendar', 'candle', 'carpet', 'chair', 'clock',
'comb', 'computer', 'couch', 'cup', 'curtain', 'cushion', 'desk', 'dryer', 'fan',
'flashlight', 'flower', 'fork', 'furnace', 'game', 'glasses', 'hammer', 'heater',
'iron', 'jewelry', 'knife', 'lamp', 'magnet', 'marker', 'medicine', 'microwave',
'mop', 'mug', 'nakin', 'oven', 'painting', 'pan', 'pants', 'paper', 'pen', 'pencil',
'phone', 'photograph', 'piano', 'pillow', 'plate', 'pot', 'radio', 'refrigerator',
'saw', 'scissors', 'screwdriver', 'shirt', 'shoes', 'sneakers', 'socks', 'sofa',
'speakers', 'spoon', 'suitcase', 'table', 'telephone', 'timer', 'tissue', 'toaster',
'toilet', 'toothbrush', 'toothpaste', 'towel', 'television', 'vacuum', 'washer']

const vehicles = ['aircraft', 'airplane', 'ambulance', 'automobile', 'balloon',
'battleship', 'bicycle', 'bike', 'blimp', 'boat', 'broomsstick', 'bulldozer',
'bus', 'cab', 'caboose', 'canoe', 'car', 'cart', 'chariot',
'chopper', 'convertible', 'crane', 'cruise', 'driver', 'engine', 'ferry',
'forklift', 'helicopter', 'hybrid', 'jeep', 'jet', 'kayak', 'lifeboat', 'locomotive',
'motor', 'motorcycle', 'oar', 'paddle', 'parachute', 'pilot', 'plane', 'propeller',
'racecar', 'raft', 'rocket', 'rowboat', 'sail', 'sailboat', 'scooter', 'ship', 'submarine',
'subway', 'tank', 'taxi', 'train', 'truck', 'unicycle', 'wagon', 'wheelchair', 'yacht']

const possibleWords = [...animals, ...foods, ...householdItems, ...vehicles]

const turnEnded = (roomNumber) => {
  if(!games[roomNumber]) {
    return
  }

  const {
    drawer,
    players,
    round,
    turn,
    wordIndex,
    words
  } = games[roomNumber]

  const rankedPlayers = _.sortBy(players, player => {
    return player.score
  }).reverse()

  if(turn >= players.length) {
    io.to(roomNumber).emit('action', {
      type: 'ROUND_ENDED',
      round,
      word: words[wordIndex],
      players: rankedPlayers
    })


    if(round === 3) {
      return setTimeout(() => {
        if(!games[roomNumber]) {
          return
        }

        io.to(roomNumber).emit('action', {
          type: 'GAME_ENDED',
          players: rankedPlayers
        })

        delete games[roomNumber]
      }, 7000)
    }

    games[roomNumber].drawer = rankedPlayers[0]
    games[roomNumber].alreadyDrawnIds = [games[roomNumber].drawer.socketId]
    games[roomNumber].alreadyGuessedIds = [games[roomNumber].drawer.socketId]
    games[roomNumber].round++
    games[roomNumber].turn = 1
    games[roomNumber].wordIndex++
    setTimeout(() => newTurn(roomNumber), 7000)
  } else {
    const playersNotPlayed = players.filter(player => {
      return !(_.contains(games[roomNumber].alreadyDrawnIds, player.socketId))
    })

    if(playersNotPlayed.length === 0) {
      io.to(roomNumber).emit('action', {
        type: 'GAME_ERROR',
        error: 'An unexpected error has occurred.'
      })

      delete games[roomNumber]
    }

    io.to(roomNumber).emit('action', {
      type: 'TURN_ENDED',
      word: words[wordIndex],
      players: rankedPlayers
    })

    games[roomNumber].drawer = playersNotPlayed[0]
    games[roomNumber].alreadyDrawnIds = [
      ...games[roomNumber].alreadyDrawnIds,
      games[roomNumber].drawer.socketId
    ]
    games[roomNumber].alreadyGuessedIds = [games[roomNumber].drawer.socketId]
    games[roomNumber].wordIndex++
    games[roomNumber].turn++
    setTimeout(() => newTurn(roomNumber), 7000)
  }
}

const newTurn = (roomNumber) => {
  if(!games[roomNumber]) {
    return
  }

  const {
    drawer,
    players,
    round,
    turn,
    wordIndex,
    words
  } = games[roomNumber]

  io.to(drawer.socketId).emit('action', {
    type: 'SHOW_WORD',
    word: words[wordIndex]
  })

  io.to(roomNumber).emit('action', {
    type: 'NEW_TURN',
    drawer,
    wordLength: words[wordIndex].length
  })

  setTimeout(() => {
    if(!games[roomNumber]) {
      return
    }

    games[roomNumber].countdownAt = new Date()

    io.to(drawer.socketId).emit('action', {
      type: 'DRAWING_PERIOD'
    })

    io.to(roomNumber).emit('action', {
      type: 'GUESSING_PERIOD',
      wordLength: words[wordIndex].length
    })

    games[roomNumber].guessingPeriodTimeout = setTimeout(() => turnEnded(roomNumber), 35000)
  }, 7000)
}


io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    const { roomNumber, id } = socket

    if(games[roomNumber]) {
      const {
        started,
        hostId,
        players
      } = games[roomNumber]

      if(!started) {
        if(id === hostId) {
          io.to(roomNumber).emit('action', {
            type: 'LOBBY_ERROR',
            error: 'The original host dipped.'
          })

          delete games[roomNumber]
        } else {
          const playerIndex = players.findIndex(player => player.socketId === id)
          players.splice(playerIndex, 1)

          io.to(roomNumber).emit('action', {
            type: 'PLAYER_LEFT_LOBBY',
            players
          })
        }
      } else {
        const playerIndex = players.findIndex(player => player.socketId === id)
        games[roomNumber].players = players.splice(playerIndex, 1)

        if(games[roomNumber].players.length < 2) {
          io.to(roomNumber).emit('action', {
            type: 'GAME_ERROR',
            error: 'Everybody has left your game. Loser.'
          })

          delete games[roomNumber]
        }
      }
    }
  })

  socket.on('path_start', data => {
    const { roomNumber } = socket
    socket.broadcast.to(roomNumber).emit('path_started', data)
  })

  socket.on('path_draw', data => {
    const { roomNumber } = socket
    socket.broadcast.to(roomNumber).emit('path_drawn', data)
  })

  socket.on('action', function(action) {
    if(action.type === 'server/set_user') {
      const { data } = action
      const { screenName, screenWidth, screenHeight } = data

      if(!screenName) {
        return socket.emit('action', {
          type: 'SET_USER_ERROR',
          error: 'You must set a screen name.'
        })
      }

      if(screenName.length > 16) {
        return socket.emit('action', {
          type: 'SET_USER_ERROR',
          error: 'Your screen name must be shorter than 16 characters.'
        })
      }

      socket.screenName = screenName
      socket.screenWidth = screenWidth
      socket.screenHeight = screenHeight

      socket.emit('action', {
        type: 'SET_USER_SUCCESS',
        screenName
      })
    } else if(action.type === 'server/create_game') {
      const { screenName, screenWidth, screenHeight } = socket

      const chance = new Chance()
      let roomNumber = chance.integer({ min: 1000000, max: 9999999 })
      while(games[roomNumber]) {
        roomNumber = chance.integer({ min: 1000000, max: 9999999 })
      }

      socket.roomNumber = roomNumber
      games[roomNumber] = {}
      games[roomNumber].hostId = socket.id
      games[roomNumber].started = false
      games[roomNumber].roomNumber = roomNumber
      games[roomNumber].players = [{
        screenName,
        screenWidth,
        screenHeight,
        score: 0,
        socketId: socket.id
      }]

      socket.join(roomNumber);
      socket.emit('action', {
        type: 'CREATE_GAME_SUCCESS',
        data: games[roomNumber]
      })
    } else if(action.type === 'server/join_game') {
      const { screenName, screenWidth, screenHeight } = socket
      const { roomNumber } = action

      socket.roomNumber = roomNumber

      if(!games[roomNumber]) {
        return socket.emit('action', {
          type: 'JOIN_GAME_ERROR',
          error: 'A game with that room number does not exist.'
        })
      }

      if(games[roomNumber].started) {
        return socket.emit('action', {
          type: 'JOIN_GAME_ERROR',
          error: 'That game has already started.'
        })
      }

      games[roomNumber].players = [...games[roomNumber].players, {
        screenName,
        screenWidth,
        screenHeight,
        score: 0,
        socketId: socket.id
      }]

      socket.join(roomNumber.toString());

      socket.emit('action', {
        type: 'JOIN_GAME_SUCCESS',
        data: games[roomNumber]
      })

      socket.broadcast.to(roomNumber).emit('action', {
        type: 'PLAYER_JOINED_LOBBY',
        players: games[roomNumber].players
      })
    } else if(action.type === 'server/start_game') {
      const { roomNumber, id } = socket

      if(id === games[roomNumber].hostId) {
        games[roomNumber].started = true
        games[roomNumber].wordIndex = 0
        games[roomNumber].turn = 1
        games[roomNumber].round = 1
        games[roomNumber].drawer = games[roomNumber].players[0]
        games[roomNumber].alreadyDrawnIds = [games[roomNumber].drawer.socketId]
        games[roomNumber].alreadyGuessedIds = [games[roomNumber].drawer.socketId]

        const maxTurns = games[roomNumber].players.length * 3
        games[roomNumber].words = _.sample(possibleWords, maxTurns)

        io.to(roomNumber).emit('action', {
          type: 'GAME_STARTED'
        })

        newTurn(roomNumber)
      }
    } else if(action.type === 'server/guess') {
      const { roomNumber, screenName } = socket
      const {
        drawer,
        alreadyGuessedIds,
        countdownAt,
        guessingPeriodTimeout,
        players,
        wordIndex,
        words
      } = games[roomNumber]

      if(action.guess.toLowerCase().trim() === words[wordIndex]) {
        if(games[roomNumber].alreadyGuessedIds.find(guessedId => guessedId === socket.id)) {
          return
        }

        const points = 520 - Math.floor(0.004 * (new Date() - countdownAt))

        const currentPlayer = players.find(player => player.socketId === socket.id)
        currentPlayer.score += points
        drawer.score += 50

        games[roomNumber].alreadyGuessedIds = [...alreadyGuessedIds, currentPlayer.socketId]
        if(players.filter(player => {
          return !(_.contains(games[roomNumber].alreadyGuessedIds, player.socketId))
        }).length === 0) {
          clearTimeout(guessingPeriodTimeout)
          return turnEnded(roomNumber)
        }

        socket.emit('action', {
          type: 'GUESS_SUCCESS',
          word: action.guess
        })

        io.to(roomNumber).emit('action', {
          type: 'PLAYER_GUESSED',
          message: `${screenName} guessed the word for ${points} points!`
        })
      } else {
        io.to(roomNumber).emit('action', {
          type: 'PLAYER_GUESSED',
          message: `${screenName}: ${action.guess}`
        })
      }
    }
  })
})
