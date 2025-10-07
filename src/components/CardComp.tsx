import type { TCard } from "../types/card.types"
import styles from "./CardComp.module.css"

export type TCardProps = {
	clickProp: (card: TCard) => void
	card: TCard
}

const CardComp = ({ clickProp, card }: TCardProps) => {
	const handleClick = () => {
		clickProp(card)
	}

	return (
		<div 
			onClick={handleClick}
			className={`${styles.card_wrapper} ${card.matched ? styles.matched : ""}`}
		>
			<div className={`${styles.card} ${card.flipped || card.matched ? styles.flipped : ""}`}>
				<div className={styles.card_front}>
					<span className={styles.card_question}>?</span>
				</div>
				<div className={styles.card_back}>
					<img src={`./imgs/${card.image}`} alt={card.name} />
				</div>
			</div>
		</div>
	)
}

export default CardComp
