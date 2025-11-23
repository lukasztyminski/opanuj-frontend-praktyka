import { useMemo, useState } from 'react';

type TripType = 'one-way' | 'round-trip';

type FlightFormState = {
  origin: string;
  destination: string;
  trip: TripType;
  startDate: string;
  endDate: string;
};

const initialState: FlightFormState = {
  origin: 'Kraków',
  destination: 'Boston',
  trip: 'one-way',
  startDate: '01-05-2024',
  endDate: '10-05-2024',
};

export function FlightScannerForm() {
  const [formData, setFormData] = useState<FlightFormState>(initialState);
  const [errors, setErrors] = useState<string[]>([]);

  const isRoundTrip = useMemo(
    () => formData.trip === 'round-trip',
    [formData.trip]
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: string[] = [];

    if (!formData.origin.trim()) newErrors.push('Origin is required');
    if (!formData.destination.trim()) newErrors.push('Destination is required');
    if (!formData.startDate.trim()) newErrors.push('Start date is required');
    if (isRoundTrip && !formData.endDate.trim()) {
      newErrors.push('Return date is required for round trip');
    }

    setErrors(newErrors);
    if (newErrors.length === 0) {
      console.log('Searching flights with data:', formData);
      alert('Searching flights… check the console for submitted data.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-md p-4 shadow-md">
        <h1 className="text-xl text-center font-bold">🛩️ Flight Scanner</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <label className="flex flex-col">
            Origin
            <input
              name="origin"
              type="text"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Cracow, Poland"
              className="border border-gray-200 rounded-md p-2"
            />
          </label>

          <label className="flex flex-col">
            Destination
            <input
              name="destination"
              type="text"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Boston, USA"
              className="border border-gray-200 rounded-md p-2"
            />
          </label>

          <div className="flex flex-col">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trip"
                value="one-way"
                checked={formData.trip === 'one-way'}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, trip: 'one-way' }))
                }
              />
              One way
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="trip"
                value="round-trip"
                checked={formData.trip === 'round-trip'}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, trip: 'round-trip' }))
                }
              />
              Round trip
            </label>
          </div>

          <div className="grid grid-cols-2 space-x-2">
            <label className="flex flex-col">
              Start at
              <input
                name="startDate"
                type="text"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="01-05-2024"
                className="border border-gray-200 rounded-md p-2"
              />
            </label>
            <label className="flex flex-col">
              Return at
              <input
                name="endDate"
                type="text"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="10-05-2024"
                className="border border-gray-200 rounded-md p-2"
                disabled={!isRoundTrip}
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 w-full"
          >
            Search
          </button>
        </form>

        <ul className="mt-4 text-red-500 space-y-1">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FlightScannerForm;
