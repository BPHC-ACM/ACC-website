import HomeContent from './components/home-content';
import { UserProvider } from './usercontext';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<UserProvider>
				<HomeContent />
			</UserProvider>
		</div>
	);
}
