import '@radix-ui/themes/styles.css';
import WelcomeMessage from './WelcomeMessage';
import About from './About';

function HomePage() {
  return (
    <div>
        <WelcomeMessage />
        <About />
    </div>
  );
}

export default HomePage;
