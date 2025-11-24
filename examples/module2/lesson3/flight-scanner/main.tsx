import { createRoot } from 'react-dom/client';
import { FlightScannerForm } from './components/FlightScannerForm';

const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<FlightScannerForm />);
}
