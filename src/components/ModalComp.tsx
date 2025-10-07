import styles from "./ModalComp.module.css"

export type TModalProps = {
	showModal: boolean
	misses: number
	matches: number
	onRestart: () => void
}

const ModalComp = ({ showModal, misses, matches, onRestart }: TModalProps) => {
	const getPerformanceEmoji = (misses: number): string => {
		if (misses === 0) return "🏆"
		if (misses <= 2) return "🌟" // Excellent hehe
		if (misses <= 5) return "😊" // Great :)
		if (misses <= 8) return "👍" // Good
		if (misses <= 12) return "😅" // Not bad
		return "💪" // Keep trying maybe
	}

	const getPerformanceMessage = (misses: number): string => {
		if (misses === 0) return "Perfect! You're a Memory Master!"
		if (misses <= 2) return "Excellent! Almost perfect!"
		if (misses <= 5) return "Great job! Well done!"
		if (misses <= 8) return "Good effort! Keep practicing!"
		if (misses <= 12) return "Not bad! Try again!"
		return "Keep practicing! You'll get better!"
	}

	return (
		<section
			className={`${styles.final_result} ${showModal ? styles.visible : ""}`}
			style={{ visibility: showModal ? "visible" : "hidden" }}
		>
			<div className={`${styles.final_container} ${showModal ? styles.animate : ""}`}>
				<h2>Game Complete!</h2>
				<div className={styles.emoji_container}>
					<span className={styles.final_icon}>
						{getPerformanceEmoji(misses)}
					</span>
				</div>
				<p className={styles.performance_message}>{getPerformanceMessage(misses)}</p>
				<div className={styles.stats}>
					<div className={styles.stat_row}>
						<span className={styles.stat_label}>Total Matches:</span>
						<span className={styles.stat_value}>{matches}</span>
					</div>
					<div className={styles.stat_row}>
						<span className={styles.stat_label}>Misses:</span>
						<span className={styles.stat_value + " " + styles.misses}>{misses}</span>
					</div>
					<div className={styles.stat_row}>
						<span className={styles.stat_label}>Score:</span>
						<span className={styles.stat_value + " " + styles.score}>
							{Math.max(100 - (misses * 5), 0)}%
						</span>
					</div>
				</div>
				<button onClick={onRestart} className={styles.restart_button}>
					Play Again?
				</button>
			</div>
		</section>
	)
}

export default ModalComp
