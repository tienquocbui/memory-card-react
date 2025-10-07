import { useEffect, useState } from "react"
import CardComp from "./components/CardComp"
import cards from "./data/cards.json"
import type { TCard, TCardList } from "./types/card.types"
import ModalComp from "./components/ModalComp"

const App = () => {
	// Create pairs of cards
	const createGameCards = (): TCardList => {
		const pairs = cards.flatMap((card) => [
			{ ...card, id: card.id },
			{ ...card, id: card.id + 100 },
		])
		const shuffled = [...pairs]
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
		}
		return shuffled
	}

	// Game cards state
	const [gameCards, setGameCards] = useState<TCardList>(createGameCards())
	
	const [flippedCards, setFlippedCards] = useState<number[]>([])

	const [misses, setMisses] = useState(0)

	// number of matches
	const [matches, setMatches] = useState(0)

	// game state
	const [gameOver, setGameOver] = useState(false)

	const [isChecking, setIsChecking] = useState(false)

	const handleCardClick = (clickedCard: TCard) => {
		if (gameOver || clickedCard.matched || isChecking || clickedCard.flipped) return
		
		if (flippedCards.length === 2) return

		// Flip the card
		setGameCards((prev) =>
			prev.map((card) =>
				card.id === clickedCard.id ? { ...card, flipped: true } : card
			)
		)
		setFlippedCards((prev) => [...prev, clickedCard.id])
	}

	useEffect(() => {
		if (flippedCards.length === 2) {
			setIsChecking(true)
			
			const [firstCardId, secondCardId] = flippedCards
			const firstCard = gameCards.find((card) => card.id === firstCardId)
			const secondCard = gameCards.find((card) => card.id === secondCardId)

			if (firstCard && secondCard) {
				if (firstCard.name === secondCard.name) {
					setMatches((prev) => prev + 1)
					setFlippedCards([])
					setGameCards((prev) =>
						prev.map((card) =>
							card.id === firstCardId || card.id === secondCardId
								? { ...card, matched: true }
								: card
						)
					)
					setIsChecking(false)
				} else {
					setMisses((prev) => prev + 1)
					
					// Flip the cards back after 1s
					setTimeout(() => {
						setGameCards((prev) =>
							prev.map((card) =>
								card.id === firstCardId || card.id === secondCardId
									? { ...card, flipped: false }
									: card
							)
						)
						setFlippedCards([])
						setIsChecking(false)
					}, 1000)
				}
			}
		}
	}, [flippedCards, gameCards])

	useEffect(() => {
		if (matches > 0 && matches === cards.length) {
			setTimeout(() => {
				setGameOver(true)
			}, 500)
		}
	}, [matches])

	const restartGame = () => {
		setGameCards(createGameCards())
		setFlippedCards([])
		setMisses(0)
		setMatches(0)
		setGameOver(false)
		setIsChecking(false)
	}

	return (
		<div className="main_section">
			<div className="game_header">
				<h1>🎮 Memory Game</h1>
				<p className="game_subtitle">Match all the superhero pairs!</p>
				<div className="stats_container">
					<div className="stat_item">
						<span className="stat_label">Matches:</span>
						<span className="stat_value">{matches}/{cards.length}</span>
					</div>
					<div className="stat_item">
						<span className="stat_label">Misses:</span>
						<span className="stat_value">{misses}</span>
					</div>
				</div>
				<button onClick={restartGame} className="restart_btn">
					Restart Game
				</button>
			</div>
			<div className="card_container">
				{gameCards.map((card: TCard) => {
					return (
						<CardComp card={card} clickProp={handleCardClick} key={card.id} />
					)
				})}
			</div>
			<ModalComp 
				showModal={gameOver} 
				misses={misses}
				matches={matches}
				onRestart={restartGame}
			/>
		</div>
	)
}

export default App
