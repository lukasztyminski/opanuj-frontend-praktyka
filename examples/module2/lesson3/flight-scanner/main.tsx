import { createRoot } from 'react-dom/client';
import { FlightScannerForm } from './FlightScannerForm';

const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<FlightScannerForm />);
}
