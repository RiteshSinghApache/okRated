// components/ErrorComponent.js
export default function ErrorComponent({ message }) {
  return (
    <div className="text-center pt-5">
      <h2>Error</h2>
      <p>{message || 'Something went wrong.'}</p>
    </div>
  );
}
