import HomeContent from './components/home-content';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<HomeContent />
		</div>
	);
}
