import Footer from '../Footer/footer';
import Section from '../section';
import Forums from './forum';
import { useUser } from 'app/userContext';

export default function Section4() {
	const { user } = useUser();
	return <Section title='Community' content={<Forums user={user} />} />;
}
